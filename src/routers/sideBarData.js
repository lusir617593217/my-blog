import {
  FormOutlined,
  UserOutlined,
  VerifiedOutlined,
  ProfileOutlined,
  WomanOutlined,
  OneToOneOutlined,
  SolutionOutlined,
  FileTextOutlined,
  FileSearchOutlined
} from '@ant-design/icons'

export default [
  {
    title: "首页",
    path: "/home",
    icon: FormOutlined,
    permission: 1
  },
  {
    title: "用户管理",
    path: "/users-manage",
    icon: UserOutlined,
    permission: 3,
    children: [
      {
        title: "用户列表",
        path: "/users-manage/user",
        icon: WomanOutlined,
        permission: 3
      }
    ]
  },
  {
    title: "权限管理",
    path: "/right-manage",
    icon: VerifiedOutlined,
    permission: 3,
    children: [
      {
        title: "角色列表",
        path: "/right-manage/classify",
        icon: SolutionOutlined,
        permission: 3
      },
      {
        title: "权限列表",
        path: "/right-manage/list",
        icon: OneToOneOutlined,
        permission: 3,
      }
    ]
  },
  {
    title: "文章管理",
    path: "/article-manage",
    icon: ProfileOutlined,
    permission: 1,
    children: [
      {
        title: "文章列表",
        path: "/article-manage/list",
        icon: FileTextOutlined,
        permission: 1,
      },
      {
        title: "统计列表",
        path: "/article-manage/classify",
        icon: FileSearchOutlined,
        permission: 2
      }
    ]
  }
]
