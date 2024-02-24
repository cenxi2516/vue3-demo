import router from '@/router'
import pinia from '@/stores/pinia'
import { type App } from 'vue'

import {
  AutoComplete,
  Button,
  Divider,
  Row,
  Col,
  Layout,
  Space,
  Affix,
  Breadcrumb,
  Dropdown,
  Menu,
  PageHeader,
  Pagination,
  Steps,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Switch,
  Slider,
  TimePicker,
  Transfer,
  Tree,
  TreeSelect,
  Upload,
  Avatar,
  Badge,
  Calendar,
  Card,
  Carousel,
  Collapse,
  Descriptions,
  Empty,
  Image,
  List,
  Popover,
  Popconfirm,
  Statistic,
  Table,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
  Alert,
  Drawer,
  Modal,
  Progress,
  Result,
  Skeleton,
  Spin,
  Anchor,
  BackTop,
  ConfigProvider,
  Typography,
  message,
  notification
} from 'ant-design-vue'

const globalRegister = (app: App<Element>) => {
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

  app.config.globalProperties.$message = message
  app.config.globalProperties.$notification = notification
}

export default globalRegister
