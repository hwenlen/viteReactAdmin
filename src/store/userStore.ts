import { create } from "zustand";
import { LocalStorage } from '@/libs/storage'
import { LoginParams, LoginResultModel } from '@/apis/user/type'
import { LoginIn, LoginOut } from '@/apis/user'
import { ResponseData } from "@/libs/request/types";
import { createSelectors } from "./utils/createSelector";
interface userStoreState {
  userName: string,
  roleName: string,
  userId: number | null,
  token: string,
  setUserInfo: (res: ResponseData) => void,
  resetUserInfo: () => void,
  handleLogin: (data: LoginParams) => Promise<LoginResultModel>,
  handleLoginOut: () => Promise<any>
}

const customLocalStorage = LocalStorage(1)
const { userName, roleName, token, userId } = customLocalStorage.getItem('userInfo') || {}
export const userStore = createSelectors(create<userStoreState>()(
  (set, get) => {
    return {
      userName: userName || '',
      roleName: roleName || '',
      userId: userId || null,
      token: token || '',
      setUserInfo: (res: ResponseData) => {
        const userInfo = {
          userName: res.data?.userName,
          roleName: res.data?.roleName,
          userId: res.data?.userId,
          token: res.data?.token,
        }
        set(userInfo)
        customLocalStorage.setItem('userInfo', userInfo)
      },
      resetUserInfo() {
        set({
          userName: '',
          roleName: '',
          userId: null,
          token: '',
        })
        customLocalStorage.removeItem('userInfo')
      },
      // 登录
      handleLogin(data: LoginParams): Promise<LoginResultModel> {
        return new Promise((resolve, reject) => {
          LoginIn(data).then(res => {
            if (res.code == 200) {
              get().setUserInfo(res)
              resolve(res.data)
            } else {
              reject(res.message)
            }
          }).catch(err => {
            reject(err)
          })
        })
      },
      // 退出
      handleLoginOut() {
        return new Promise((resolve, reject) => {
          LoginOut().then(res => {
            if (res.code == 200) {
              get().resetUserInfo()
              resolve(res.message)
            } else {
              reject(res.message)
            }
          }).catch(err => {
            reject(err)
          })
        })
      }
    }
  }
))