import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { librariesSelector } from "../redux/selectors/librariesSelector";
import { Statistic, Row, Col, PageHeader, Space, Card } from "antd";
import isEmpty from "ramda/src/isEmpty";
import head from 'ramda/src/head'

const ROW_GUTTER = [16, 16];
const COL_SPAN = 8

const FEILDS_NAMES = {
  order: "Уникльный номер набора",
  fullname: "Имя набора данных",
  kopuk: "КОПУК",
  territory: "Регион",
  address: "Адрес",
  formname: "Имя формы",
  period: "Год",
  libraries: "Количество библиотек",
  buildings_repair: "Зданий ремонтируется",
  buildings_disrepair: "Зданий без ремонта",
  buildings_management: "Зданий под управлением",
  libraries_computers: "Количество компьютеров для посетителей",
  internet: "Подключений к Internet",
  site: "Сайтов",
  "number_of_personal_computers_in_libraries,_units":
    "Количество компьютеров всего",
  computers: "Компьютеров для персонала",
  digital_catalogs: "Цифровых каталогов",
  internet_catalogs: "Интернет каталогов",
  electronic_catalogue_volume: "Объем цифровых каталогов",
  internet_catalogue_volume: "Объем цифровых каталогов",
  users: "Посетителей",
  users_children: "Детей-посетителей",
  visits: "Посещений",
  received_copies: "Количество копий",
  received_electronic: "Электронных копий",
  out_of_instances: "Нехватка копий",
  dropped_copies: "Испорченных копий",
  copies: "Копий всего",
  copies_electronic: "Электронных копий всего",
  copies_issued: "Запрошено копий",
  issued_electronic: "Запрошено электронных копий",
  copies_issued_children: "Запрошено детьми",
  subscribers: "Читательских билетов",
  "individual_subscribers_(information_services),_units": "Клиентов всего",
  visits_sites: "Посетителей сайтов",
  employees: "Сотрудников",
  employees_staff: "Сотрудников в штате",
  staff_higheeducated: "Сотрудников с высшим образованием",
  "staff_vocational,_people": "С проф образованием",
  funds: "Годовой бюджет",
  funds_budget: "Субсидии бюджета",
  funds_entrepreneurial: "Частные пожертвования",
  "funds_main_activity,_thousand_rubles": "Поступлений от основной деятельности",
  funds_used: "Израсходовано",
  "funds_staff,_thousand_rubles": "Фонд оплаты труда",
  funds_acquisition: "Получено средств",
};

const processLib = (data) => {
  return Object.keys(data).map((el, index, array) =>
    array.slice(index, index + 2)
  );
};
export const Library = () => {
  const libs = useSelector(librariesSelector);
  const { kopuk } = useParams();
  const lib = head(libs.filter((el) => el.kopuk === kopuk)) || [];
  if (isEmpty(lib)){
    window.history.back();
  }

  const fields = processLib(lib);

  return (
    <div className="libs">
      <Space direction="vertical" size="large">
        <PageHeader
          title={lib.formname}
          onBack={() => window.history.back()}
        ></PageHeader>
      </Space>

      <div>
        {fields.map((fieldArray, index) => (
          <Row gutter={ROW_GUTTER} justify="center" key={`row${index}`}>
            {fieldArray.map((field) => (
              <Col span={COL_SPAN} key={field}>
                <Card>
                  <Statistic title={FEILDS_NAMES[field]} value={lib[field]} />
                </Card>
              </Col>
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
};
