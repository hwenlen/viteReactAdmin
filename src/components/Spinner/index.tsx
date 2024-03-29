import { theme, Spin } from 'antd';
import classNames from 'classnames';
import './index.less'
const Spinner = ({ fulled }: { fulled?: boolean }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div style={{ background: colorBgContainer }} className={classNames("spinner", fulled && 'fulled')}>
      <Spin size="large" />
    </div>
  );
};

export default Spinner;