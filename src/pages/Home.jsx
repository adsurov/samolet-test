import React, { useEffect,useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import compose from "ramda/src/compose";

// Actions
import {
  setLibsLoadingAction,
  librariesLoadedAction,
} from "../redux/actions/librariesActions";

// Selectors
import {
  librariesSelector,
  libsLoadingSelector,
} from "../redux/selectors/librariesSelector";

// Components
import { Table, Space, PageHeader, Skeleton  } from "antd";
import {FilterDropdown} from '../components/FilterDropdown';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

// Api Service
import { getData } from "../api";

const trimSpaces = (data) =>
  data.map((el) => ({ ...el, territory: el.territory.trim() }));

const DEFAULT_SEARCH_VALUE = { searchText: "" };
const FILTER_ICON_COLOR = "#1890ff";
const HIGHTLIGHT_COLOR = "#ffc069";

export const Home = () => {
  const dispatch = useDispatch();
  const libs = useSelector(librariesSelector);
  const isLoading = useSelector(libsLoadingSelector);
  const ref = useRef(null)
  const [search, setSearch] = useState(DEFAULT_SEARCH_VALUE);
  const dispatchLibsData = compose(dispatch, librariesLoadedAction, trimSpaces);

  useEffect(() => {
    if (!isLoading && !libs.length) {
      dispatch(setLibsLoadingAction());
      getData().then(dispatchLibsData);
    }
  }, [dispatch, dispatchLibsData, isLoading, libs]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearch(DEFAULT_SEARCH_VALUE);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <FilterDropdown
        selectedKeys={selectedKeys}
        confirm={confirm}
        dataIndex={dataIndex}
        setSelectedKeys={setSelectedKeys}
        clearFilters={clearFilters}
        ref={ref}
        search={handleSearch}
        reset={handleReset}
      />
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{ color: filtered ? FILTER_ICON_COLOR : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => ref.current.select());
      }
    },
    render: (text) =>
      search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: HIGHTLIGHT_COLOR, padding: 0 }}
          searchWords={[search.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });



  const columns = [
    {
      title: "Регион РФ",
      dataIndex: "territory",
      defaultSortOrder: "descend",
      key: "territory",
      width: "30%",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        switch (true) {
          case a.territory[0] > b.territory[0]:
            return 1;
          case a.territory[0] < b.territory[0]:
            return -1;
          default:
            return 0;
        }
      },
      ...getColumnSearchProps("territory"),
    },
    {
      title: "Количество библиотек",
      dataIndex: "libraries",
      filterMultiple: false,
      key: "libraries",
      width: "30%",
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.libraries - b.libraries,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      width: "30%",
      render: (props) => {
        return <Link to={props.kopuk}>Подробности</Link>;
      },
    },
  ];

  return (
    <div className="home">
      <Space direction="horizontal" size="large">
        <Space direction="vertical" size="middle">
          <PageHeader title="Библиотеки России" />
        </Space>
      </Space>
      <Space direction="horizontal" size="large">
        {isLoading ? (
          <Skeleton />
        ) : (
          <Table columns={columns} dataSource={libs} pagination={false} />
        )}
      </Space>
    </div>
  );
};
