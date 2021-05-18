import React, { useLayoutEffect, useState } from 'react';
import { Table, Card, Button, Modal } from 'antd';
import { getUser } from '../api/user';
import cookies from 'js-cookie';

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
  const [tab, setTab] = useState('Vegetables');
  const [vegetables, setVegetables] = useState([]);
  const [meat, setMeat] = useState([]);
  const [spices, setSpices] = useState([]);
  const [condiments, setCondiments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  useLayoutEffect(() => {
    getUser(JSON.parse(cookies.get('user')).token).then((res) => {
      console.log('res: ', res);
      setVegetables(res.data.vegetables);
      setMeat(res.data.meats);
      setSpices(res.data.spices);
      setCondiments(res.data.condiments);
    });
  }, [setVegetables]);
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
      case 'Vegetables':
        return <Table columns={columns} dataSource={vegetables || []} />;
      case 'Meat':
        return <Table columns={columns} dataSource={meat || []} />;
      case 'Spices':
        return <Table columns={columns} dataSource={spices || []} />;
      case 'CondimentAndSauces':
        return <Table columns={columns} dataSource={condiments || []} />;
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
      ></Modal>
    </Card>
  );
};

export default Inventory;
