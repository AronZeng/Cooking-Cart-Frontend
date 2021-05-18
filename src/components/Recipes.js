import React, { useState, useLayoutEffect } from 'react';
import { List, Space, Col, Row, Input, Card, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { getRecipes } from '../api/recipes';
import cookies from 'js-cookie';
import styled from 'styled-components';
const { Title, Text } = Typography;

const { Search } = Input;
const StyledScroller = styled.div`
  height: 100%;
  padding: 8px 24px;
  overflow: auto;
  border-radius: 4px;
`;

const StyledCard = styled(Card)`
  margin-top: 16px;
`;
const Recipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeCount, setRecipeCount] = useState(0);
  const [page, setPage] = useState(1);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const loadMore = () => {
    const token = JSON.parse(cookies.get('user')).token;
    getRecipes(token, page).then((res) => {
      setRecipes(recipes.concat(res.data.data.recipes));
      setRecipeCount(res.data.data.count);
      setPage(page + 1);
    });
  };

  useLayoutEffect(() => {
    const token = JSON.parse(cookies.get('user')).token;
    getRecipes(token, page)
      .then((res) => {
        setRecipes(res.data.data.recipes);
        setRecipeCount(res.data.data.count);
        setPage(2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRecipes]);

  return (
    <>
      <Card title="Recipes" bodyStyle={{ padding: 0 }}>
        <Row>
          <Col span={6}>
            <Search />
            <InfiniteScroll
              hasMore={recipes.length < recipeCount}
              loadMore={loadMore}
              initialLoad={false}
            >
              <List
                dataSource={recipes}
                renderItem={(item) => (
                  <StyledCard
                    title={item.name}
                    key={item._id}
                    style={{ cursor: 'pointer', borderLeft: 0 }}
                    onClick={() => {
                      setCurrentRecipe(
                        recipes.find(
                          (recipe) =>
                            recipe._id.toString() === item._id.toString()
                        )
                      );
                    }}
                  >
                    <p>{item.description}</p>{' '}
                  </StyledCard>
                )}
              />
            </InfiniteScroll>
          </Col>
          {currentRecipe ? (
            <Col offset={1} span={16}>
              <Card
                title={currentRecipe.name}
                style={{
                  marginRight: '10px',
                  minWidth: '100%',
                  minHeight: '96%',
                  position: 'fixed',
                }}
              >
                <Space direction="vertical" size={100}></Space>
              </Card>
            </Col>
          ) : null}
        </Row>
      </Card>
    </>
  );
};

export default Recipes;
