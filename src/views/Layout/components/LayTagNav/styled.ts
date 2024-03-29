import styled from "styled-components";
import { Button, Tag } from 'antd'

// const { getDesignToken } = theme;

// // 通过静态方法获取
// const { colorBgContainer } = getDesignToken();

export const TagNavWrap = styled.div`
  position: relative;
  height: 40px;
  margin-bottom: 16px;

  & .scroll-outer {
    position: absolute;
    left: 32px;
    right: 94px;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
    overflow: hidden;
  }

  & .scroll-body {
    height: calc(100% - 1px);
    display: inline-block;
    padding: 1px 4px 0;
    position: absolute;
    overflow: visible;
    white-space: nowrap;
    transition: left 0.3s ease;
  }
`

export const TagNavButton = styled(Button).attrs({
  type: "default"
})`
  width: 32px;
  height: 40px;
  background-color: ${props => props['data-color'] ? props['data-color'] : '#fff'};
  border-radius: 0;
  position: absolute;
  top: 0;
  z-index: 10;
  border: none;
  &.btn-close {
    right: 32px;
    border-left: 1px solid;
    border-color: ${props => props['data-color'] == '#ffffff' ? '#F0F0F0' : '#666'};
  }
  &.btn-left {
    left: 0;
  }
  &.btn-right {
    right: 64px;
  }
  &.btn-setting {
    right: 0;
    border-left: 1px solid;
    border-color: ${props => props['data-color'] == '#ffffff' ? '#F0F0F0' : '#666'};
  }
`

export const TagNavTag = styled(Tag)`
  height: 32px;
  line-height: 30px;
  cursor: pointer;
  margin: 2px 4px 2px 0;
  border-radius: 2px;
`