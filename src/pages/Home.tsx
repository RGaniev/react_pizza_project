import React from "react";
import qs from "qs";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filter/slice";
import { fetchPizzas } from "../redux/slices/pizza/slice";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import SortPopup, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { Pizza, SearchPizzaParams } from "../redux/slices/pizza/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue, categoryId, sort, isASC, orderType, currentPage } =
    useSelector((state: RootState) => state.filter);
  const { status, items } = useSelector((state: RootState) => state.pizza);

  const onChangeCategory = React.useCallback(
    (idx: number) => dispatch(setCategoryId(idx)),
    []
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const pizzas = items.map((obj: Pizza) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        currentPage,
        categoryId,
        sort,
        isASC,
        orderType,
        search,
      })
    );
  };

  // Если был первый рендер, то проверяем URL параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => obj.sortProperty === params.sort);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.categoryId),
          sort: sort ? sort : sortList[0],
          isASC: params.isASC,
          orderType: params.orderType,
          currentPage: Number(params.currentPage),
        })
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  // Если параметры были изменены и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
        orderType: isASC ? "asc" : "desc",
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, isASC, orderType, currentPage, navigate]);

  // Если был первый рендер, запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, orderType, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup sort={sort} isASC={isASC} />
      </div>
      <h2 className="content__title">
        {status === "error" ? "Ошибка" : "Все пиццы"}
      </h2>
      {status === "error" ? (
        <div className="content__error-info">
          <p>Произошла ошибка при получении пицц</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      {currentPage === 30 ? (
        ""
      ) : (
        <Pagination onChangePage={onChangePage} currentPage={currentPage} />
      )}
    </>
  );
};

export default Home;
