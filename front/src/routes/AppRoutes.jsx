import { Routes, Route } from "react-router-dom";
import JigyosyoTransactionList from "@/pages/JigyosyoTransactionList";
import JigyosyoTransactionCreate from "@/pages/JigyosyoTransactionCreate";
import JigyosyoSearch from "@/pages/JigyosyoSearch";
import JigyosyoAdd from "@/pages/JigyosyoAdd";
import FAQView from "@/pages/FAQView";
import InruiryForm from "@/pages/InquiryForm";
import VersionInfo from "@/pages/VersionInfo";
import Login from "@/pages/Login";

const AppRoutes = ({ setLoggedIn }) => {
  return (
    <Routes>
      <Route path="/transaction/list" element={<JigyosyoTransactionList />} />
      <Route
        path="/transaction/create"
        element={<JigyosyoTransactionCreate />}
      />
      <Route path="/jigyosyo/search" element={<JigyosyoSearch />} />
      <Route path="/jigyosyo/add" element={<JigyosyoAdd />} />
      <Route path="/faq" element={<FAQView />} />
      <Route path="/inquiry" element={<InruiryForm />} />
      <Route path="/version" element={<VersionInfo />} />
      <Route
        path="/login"
        element={<Login onLoginSuccess={() => setLoggedIn(true)} />}
      />
    </Routes>
  );
};

export default AppRoutes;
