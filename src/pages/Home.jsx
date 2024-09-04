import React, { useState, useEffect } from "react";

import Table from "../components/Table";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";
import { getCity } from "../api/getCity";

const Home = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * limit;
    const data = await getCity(searchTerm, limit, offset);
    if (data) {
      setCities(data?.data);
      setTotalCount(data?.metadata?.totalCount);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm, limit, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalCount / limit)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <SearchBox
        onSearch={setSearchTerm}
      />
      <Table cities={cities} loading={loading} />
      <Pagination
        limit={limit}
        setLimit={setLimit}
        currentPage={currentPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
