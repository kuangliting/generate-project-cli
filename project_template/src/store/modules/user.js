import { getToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: 'Super Admin',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  introduction: 'I am a super administrator',
  roles: ['admin']
}

export default {
  namespaced: true,
  state
}
