import router from '@/router'
import pinia from '@/stores/pinia'
import { type App } from 'vue'

import {
  Affix,
  Alert,
  Anchor,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  Layout,
  List,
  Menu,
  Modal,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Result,
  Row,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Typography,
  Upload,
  message,
  notification
} from 'ant-design-vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'


export const globalRegister = (app: App<Element>) => {
  app.use(pinia)
  app.use(router)

  app
    .use(Button)
    .use(Divider)
    .use(Row)
    .use(Col)
    .use(Layout)
    .use(Space)
    .use(Affix)
    .use(Breadcrumb)
    .use(Dropdown)
    .use(Menu)
    .use(PageHeader)
    .use(Pagination)
    .use(Steps)
    .use(Cascader)
    .use(Checkbox)
    .use(DatePicker)
    .use(Form)
    .use(Input)
    .use(InputNumber)
    .use(Radio)
    .use(Rate)
    .use(Select)
    .use(Switch)
    .use(Slider)
    .use(TimePicker)
    .use(Transfer)
    .use(Tree)
    .use(TreeSelect)
    .use(Upload)
    .use(Avatar)
    .use(Badge)
    .use(Calendar)
    .use(Card)
    .use(Carousel)
    .use(Collapse)
    .use(Descriptions)
    .use(Empty)
    .use(Image)
    .use(List)
    .use(Popover)
    .use(Popconfirm)
    .use(Statistic)
    .use(Table)
    .use(Tabs)
    .use(Tag)
    .use(Timeline)
    .use(Tooltip)
    .use(Alert)
    .use(Drawer)
    .use(Modal)
    .use(Progress)
    .use(Result)
    .use(Skeleton)
    .use(Spin)
    .use(Anchor)
    .use(BackTop)
    .use(ConfigProvider)
    .use(AutoComplete)
    .use(Typography)

  app.use(Viewer)

  app.config.globalProperties.$message = message
  app.config.globalProperties.$notification = notification

  message.config({
    top: `100px`,
    duration: 2,
    maxCount: 3,
    rtl: true,
    prefixCls: 'pms-message'
  })
}
