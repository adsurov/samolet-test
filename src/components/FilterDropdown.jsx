import React, { forwardRef } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const FilterDropdown = forwardRef(
  (
    {
      selectedKeys,
      confirm,
      dataIndex,
      setSelectedKeys,
      clearFilters,
      search,
      reset,
    },
    ref
  ) => {
    const handleSearch = () => {
      search(selectedKeys, confirm, dataIndex);
    };

    const handleReset = () => {
      reset(clearFilters);
    };

    const handleChange = (e) =>
      setSelectedKeys(e.target.value ? [e.target.value] : []);
    return (
      <div style={{ padding: 8 }}>
        <Input
          ref={ref}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={handleChange}
          onPressEnter={handleSearch}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={handleSearch}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={handleReset} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    );
  }
);
