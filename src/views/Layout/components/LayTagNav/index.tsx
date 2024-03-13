import { Button, Dropdown, Tag } from 'antd'
import type { MenuProps } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, CloseCircleFilled } from '@ant-design/icons'
import styles from './index.module.less'
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuStore } from '@/store/menuStore';
import { routeMatchType } from "@/router/types";

interface PropsTypes {
  pathName: string,
  routeInfos: routeMatchType[]
}

const items: MenuProps['items'] = [
  {
    label: '关闭所有',
    key: 'all',
  },
  {
    label: '关闭其他',
    key: 'other',
  }
];


const LayTagNav = ({ pathName, routeInfos }: PropsTypes) => {
  const navigate = useNavigate()
  const [tagBodyLeft, setTagBodyLeft] = useState(0)
  const scrollOuter = useRef<HTMLDivElement>(null)
  const scrollBody = useRef<HTMLDivElement>(null)

  // 点击左右箭头
  const handleScroll = (offset: number) => {
    if (offset > 0) {
      setTagBodyLeft(Math.min(0, tagBodyLeft + offset))
    } else {
      const sOuterCurWidth = scrollOuter.current!.offsetWidth
      const sBodyCueWidth = scrollBody.current!.offsetWidth
      if (sOuterCurWidth < sBodyCueWidth) {
        if (tagBodyLeft >= -(sBodyCueWidth - sOuterCurWidth)) {
          setTagBodyLeft(Math.max(tagBodyLeft + offset, sOuterCurWidth - sBodyCueWidth))
        }
      } else {
        setTagBodyLeft(0)
      }
    }
  }

  // 鼠标滚轮
  const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    let delta = 0
    delta = (e.deltaY) ? -e.deltaY : -(e.detail || 0) * 40
    handleScroll(delta)
  }
  // 跳转时添加tag
  const { tagNavList, addNavTag, delNavTag, getToRouteName } = menuStore()

  useEffect(() => {
    const routeInfo = routeInfos[routeInfos.length - 1] || null
    addNavTag(routeInfo)
  }, [addNavTag, routeInfos])
  // 点击tag跳转
  const tagClick = (item: routeMatchType) => {
    if (item.path == pathName) return
    navigate(item.path)
  }
  // 关闭tag
  const tagClose = (key: string, item?: routeMatchType) => {
    const pn = item?.path || pathName
    switch (key) {
      case 'single':
        // 跳转到下一个标签页面
        if (item!.path == pathName) navigate(getToRouteName(pathName))
        break;
      case 'all':
        navigate('/home')
        break;
      default:
        break;
    }
    delNavTag(key, pn)
  }

  return (
    <div className={styles['tag-nav']}>
      <Button
        className={styles['btn-left']}
        type="default"
        icon={<CaretLeftOutlined />}
        onClick={() => handleScroll(240)}
      />
      <Button
        className={styles['btn-right']}
        type="default"
        icon={<CaretRightOutlined />}
        onClick={() => handleScroll(-240)}
      />

      <Dropdown menu={{ items, onClick: ({ key }) => tagClose(key) }} arrow>
        <Button
          className={styles['btn-close']}
          type="default"
          icon={<CloseCircleFilled />}
        />
      </Dropdown>
      <div className={styles['scroll-outer']} ref={scrollOuter} onWheel={(e) => handleWheelScroll(e)}>
        <div className={styles['scroll-body']} ref={scrollBody} style={{ left: tagBodyLeft + 'px' }}>
          {tagNavList.map(item => {
            return (
              <Tag
                closeIcon={item.path != '/home'}
                color={item.path == pathName ? "#108ee9" : ''}
                key={item.path}
                onClick={() => tagClick(item)}
                onClose={() => tagClose('single', item)}>
                {item.meta.title}
              </Tag>
            )
          })}
        </div>
      </div>
    </div >
  )
}

export default LayTagNav