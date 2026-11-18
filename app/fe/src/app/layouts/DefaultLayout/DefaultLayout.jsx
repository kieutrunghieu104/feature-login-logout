import { Outlet } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);

function DefaultLayout() {
  return (
    <>
      <div className={cx("wrapper")} >
        <header>Header</header>
        <Outlet />
        <footer>Footer</footer>
      </div >
    </>
  );
}

export default DefaultLayout;