import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import User from './module/user'
import List from './module/list'
const mockModules = [...User, ...List]

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}