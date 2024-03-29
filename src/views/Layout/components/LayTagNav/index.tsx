import { Dropdown } from 'antd'
import type { MenuProps } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, CloseCircleFilled, SettingFilled } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tagNavStore } from '@/store/tagNavStore';
import { routeMatchType } from "@/router/types";
import { useShallow } from 'zustand/react/shallow';
import LaySetting from '../LaySetting';
import { TagNavWrap, TagNavButton, TagNavTag } from './styled'

interface PropsTypes {
  pathName: string,
  routeInfos: routeMatchType[],
  colorBg: string
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


const LayTagNav = ({ pathName, routeInfos, colorBg }: PropsTypes) => {
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
  const { tagNavList, addNavTag, delNavTag, getToRouteName } = tagNavStore(useShallow(
    state => ({
      tagNavList: state.tagNavList,
      addNavTag: state.addNavTag,
      delNavTag: state.delNavTag,
      getToRouteName: state.getToRouteName,
    }))
  )

  useEffect(() => {
    const routeInfo = routeInfos[routeInfos.length - 1] || null
    addNavTag(routeInfo)
  }, [addNavTag, routeInfos])

  // 点击tag跳转
  const tagClick = (item: routeMatchType) => {
    if (item.pathname == pathName) return
    navigate(item.pathname!)
  }
  // 关闭tag
  const tagClose = (key: string, item?: routeMatchType) => {
    const pn = item?.pathname || pathName
    switch (key) {
      case 'single':
        // 跳转到下一个标签页面
        if (item!.pathname == pathName) navigate(getToRouteName(pathName))
        break;
      case 'all':
        navigate('/home')
        break;
      default:
        break;
    }
    delNavTag(key, pn)
  }
  // 打开设置
  const [openSetting, setOpenSetting] = useState(false);

  return (
    <TagNavWrap>
      <TagNavButton
        className='btn-left'
        data-color={colorBg}
        icon={<CaretLeftOutlined />}
        onClick={() => handleScroll(240)}
      />
      <TagNavButton
        className='btn-right'
        data-color={colorBg}
        icon={<CaretRightOutlined />}
        onClick={() => handleScroll(-240)}
      />
      <TagNavButton
        className='btn-setting'
        data-color={colorBg}
        icon={<SettingFilled />}
        onClick={() => setOpenSetting(true)}
      />

      <Dropdown menu={{ items, onClick: ({ key }) => tagClose(key) }} arrow>
        <TagNavButton
          className='btn-close'
          data-color={colorBg}
          icon={<CloseCircleFilled />}
        />
      </Dropdown>
      <div className='scroll-outer' ref={scrollOuter} onWheel={(e) => handleWheelScroll(e)}>
        <div className='scroll-body' ref={scrollBody} style={{ left: tagBodyLeft + 'px' }}>
          {tagNavList.map(item => {
            return (
              <TagNavTag
                closeIcon={item.pathname != '/home'}
                color={item.pathname == pathName ? "#108ee9" : ''}
                key={item.pathname}
                onClick={() => tagClick(item)}
                onClose={() => tagClose('single', item)}>
                {item.meta.title}
              </TagNavTag>
            )
          })}
        </div>
      </div>
      <LaySetting open={openSetting} setOpen={setOpenSetting} />
    </TagNavWrap>
  )
}

export default LayTagNav