import { Spin } from 'antd';
import classNames from 'classnames';
import './index.less'
const Spinner = ({ fulled }: { fulled?: boolean }) => {
  return (
    <div className={classNames("spinner", fulled && 'fulled')}>
      <Spin size="large" />
    </div>
  );
};

export default Spinner;