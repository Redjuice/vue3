import {
  Avatar,
  Button,
  ConfigProvider,
  Layout,
  Menu,
  Row,
  Col,
  Table,
  Tabs,
  Alert,
  Card,
  Form,
  Input,
  Pagination,
  Dropdown
} from "ant-design-vue";

const components = {
  Avatar,
  Button,
  ConfigProvider,
  Layout,
  Menu,
  Row,
  Col,
  Table,
  Tabs,
  Alert,
  Card,
  Form,
  Input,
  Pagination,
  Dropdown
};

export default {
  install(Vue) {
    Object.keys(components).forEach(key => {
      Vue.use(components[key]);
    });
  }
};
