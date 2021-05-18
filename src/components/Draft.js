import React, { useState, useLayoutEffect } from 'react';
import { List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { getRecipes } from '../api/recipes';
import cookies from 'js-cookie';
import styled from 'styled-components';
import { isCompositeComponent } from 'react-dom/test-utils';

const styledScroller = styled.div`
  min-height: 100%;
  padding: 8px 24px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
`;

const Recipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeCount, setRecipeCount] = useState(0);
  const [page, setPage] = useState(1);
  const [canStillLoad, setCanStillLoad] = useState(true);

  const loadMore = () => {
    console.log('loadmore called');
    const token = JSON.parse(cookies.get('user')).token;
    getRecipes(token, page).then((res) => {
      setRecipes(recipes.concat(res.data.data.recipes));
    });
  };

  useLayoutEffect(() => {
    const token = JSON.parse(cookies.get('user')).token;
    console.log(token);
    getRecipes(token, page)
      .then((res) => {
        console.log(res);
        setRecipes(res.data.data.recipes);
        setRecipeCount(res.data.data.count);
        setPage(page + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRecipes]);

  return (
    <>
      <styledScroller style={{ overflow: 'auto' }} id="scoller">
        <InfiniteScroll hasMore={!(recipes.length > 100)} loadMore={loadMore}>
          <List
            dataSource={recipes}
            renderItem={(item) => {
              return (
                <>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                  <p>{item.name}</p>
                </>
              );
            }}
          >
            This is the list
          </List>
        </InfiniteScroll>
      </styledScroller>
    </>
  );
};

export default Recipes;
