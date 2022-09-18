import { Routes, Route } from "react-router-dom";

import { Home } from "../components/Home";
import { Title } from "../components/Title";
import { Tag } from "../components/Tag";
import { Page404 } from "../components/Page404";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/title" element={<Title />} />
      <Route path="/tag" element={<Tag />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
