import { Routes, Route } from "react-router-dom";
import JigyosyoTransactionList from "@/pages/JigyosyoTransactionList";
import JigyosyoTransactionCreate from "@/pages/JigyosyoTransactionCreate";
import JigyosyoTransactionEdit from "@/pages/JigyosyoTransactionEdit";
import JigyosyoSearch from "@/pages/JigyosyoSearch";
import JigyosyoAdd from "@/pages/JigyosyoAdd";
import FAQView from "@/pages/FAQView";
import InquiryForm from "@/pages/InquiryForm";
import VersionInfo from "@/pages/VersionInfo";
import DownloadExcel from "@/pages/DownloadExcel";
import Login from "@/pages/Login";
import ListTransactionByJigyosyo from "@/pages/ListTransactionByJigyosyo";

const AppRoutes = ({ setLoggedIn }) => {
  return (
    <Routes>
      <Route path="/transaction/list" element={<JigyosyoTransactionList />} />
      <Route
        path="/transaction/create"
        element={<JigyosyoTransactionCreate />}
      />
      <Route
        path="/transaction/edit/:id"
        element={<JigyosyoTransactionEdit />}
      />
      <Route path="/jigyosyo/search" element={<JigyosyoSearch />} />
      <Route path="/jigyosyo/add" element={<JigyosyoAdd />} />
      <Route path="/faq" element={<FAQView />} />
      <Route path="/inquiry" element={<InquiryForm />} />
      <Route path="/version" element={<VersionInfo />} />
      <Route
        path="/list-transaction-by-jigyosyo"
        element={<ListTransactionByJigyosyo />}
      />
      <Route path="/excel" element={<DownloadExcel />} />
      <Route
        path="/login"
        element={<Login onLoginSuccess={() => setLoggedIn(true)} />}
      />
    </Routes>
  );
};

export default AppRoutes;
