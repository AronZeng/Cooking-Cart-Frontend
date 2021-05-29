import React, { useContext, useLayoutEffect, useState } from 'react';
import {
  Table,
  Card,
  Button,
  Modal,
  Input,
  InputNumber,
  Select,
  Col,
  Row,
} from 'antd';
import { getUser, updateUser } from '../api/user';
import cookies from 'js-cookie';
import { Formik } from 'formik';
import AuthContext from '../context/AuthContext';

//TODO:
//Create a component for a input nested in a row
//Use the formik Field component to render the input component
//Clean up the code a bit

//Extra:
//Styling

const { Option } = Select;

const columns = [
  {
    title: 'Ingredient',
    dataIndex: 'name',
    key: 'name',
    render: (item) => <a>{item}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'amount',
    key: 'amount',
    render: (quantity) => <a>{quantity}</a>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <button
        onClick={() => {
          console.log(record);
        }}
      >
        Test
      </button>
    ),
  },
];

const Inventory = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [tab, setTab] = useState('vegetables');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useLayoutEffect(() => {
    getUser(JSON.parse(cookies.get('user')).token).then((res) => {
      setUser(res.data.data);
    });
  }, [setUser]);
  const tabList = [
    {
      key: 'Vegetables',
      tab: 'Vegetables',
    },
    {
      key: 'Meat',
      tab: 'Meat',
    },
    {
      key: 'Spices',
      tab: 'Spices',
    },
    {
      key: 'CondimentAndSauces',
      tab: 'Condiments and Sauces',
    },
  ];

  const IngredientTable = ({ type }) => {
    switch (type) {
      case 'vegetables':
        return <Table columns={columns} dataSource={user.vegetables || []} />;
      case 'meats':
        return <Table columns={columns} dataSource={user.meats || []} />;
      case 'spices':
        return <Table columns={columns} dataSource={user.spices || []} />;
      case 'condiments':
        return <Table columns={columns} dataSource={user.condiments || []} />;
    }
  };

  // const contentList = {
  //   Vegetables: <p>Vegetables</p>,
  //   Meat: <p>Meat</p>,
  //   Spices: <p>Spices</p>,
  //   CondimentAndSauces: <p>Sauces</p>,
  // };

  return (
    <Card
      title="Kitchen Inventory"
      style={{ height: '100%' }}
      tabList={tabList}
      activeTabKey={tab}
      onTabChange={(key) => {
        setTab(key);
      }}
    >
      <IngredientTable type={tab} />
      <Button
        style={{
          marginTop: '10px',
          marginBottom: '20px',
          minHeight: '100%',
        }}
        type="primary"
        shape="round"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Add New Ingredient
      </Button>
      <Modal
        title="Add New Ingredient"
        visible={isModalOpen}
        confirmLoading={isFormSubmitting}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <Formik
          initialValues={{ name: '', amount: 0, unit: 'gram' }}
          onSubmit={(values, { resetForm }) => {
            console.log('here');
            console.log(values);
            setIsFormSubmitting(true);
            let newUser = { ...user };
            let newIngredient = {
              name: values.name,
              amount: values.amount,
              unit: values.unit,
            };
            console.log('new ingredient', newIngredient);
            switch (tab) {
              case 'vegetables':
                console.log('editing vegetables');
                newUser.vegetables.push(newIngredient);
                break;
              case 'meats':
                newUser.meats.push(newIngredient);
                break;
              case 'spices':
                newUser.spices.push(newIngredient);
                break;
              case 'condiments':
                newUser.condiments.push(newIngredient);
                break;
            }

            updateUser(JSON.parse(cookies.get('user')).token, newUser)
              .then((res) => {
                setUser(res.data);
              })
              .catch((res) => {
                console.log(res);
              });
            resetForm({ name: '', amount: 0, unit: 'gram' });
            setIsFormSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col span={12} offset={6}>
                  <Input
                    name="name"
                    id="name"
                    onBlur={handleBlur}
                    defaultValue={values.name}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12} offset={6}>
                  <InputNumber
                    name="amount"
                    id="amount"
                    onBlur={handleBlur}
                    defaultValue={values.amount}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12} offset={6}>
                  <Select
                    name="unit"
                    id="unit"
                    onBlur={handleBlur}
                    defaultValue={values.unit}
                  >
                    <Option value="ml">ml</Option>
                    <Option value="gram">gram</Option>
                    <Option value="cup">cup</Option>
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={12} offset={6}>
                  <Button onClick={handleSubmit}>Save</Button>
                </Col>
              </Row>
            </form>
          )}
        </Formik>
      </Modal>
    </Card>
  );
};

export default Inventory;
