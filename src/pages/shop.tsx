import { useEffect, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import _ from "underscore";
import { AutoGrid, Banner, Body1, Button, Card3, Card4, Display, H5, Input, Menu1, P, Section, Widget } from "../components";
// @ts-ignore
import RangeSlider from "react-range-slider-input";
import { useQuery } from "react-query";
import { getCategories, getCategoryProducts, getProducts, getProductStats } from "../services";
import { Params } from "../services/util/makeRequest";

const ShopWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 100%;
  width: 100%;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: unset;
  }
`;

const FilterWrapper = styled.aside`
  overflow: hidden;
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    padding-inline-end: 71px;
  }
`;

interface FilterSectionProps {
  showSm?: boolean;
}

const FilterSection = styled.section<FilterSectionProps>`
  width: 100%;
  flex-direction: column;
  gap: 24px;
  padding-block-end: 72px;

  display: ${(props) => (props.showSm ? "flex" : "none")};

  &:first-child {
    padding-block-start: 66px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: flex;
  }
`;

interface SpaceBetweenProps {
  selected?: boolean;
}

const SpaceBetween = styled.div<SpaceBetweenProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.selected
      ? css`
          background-color: ${props.theme.colors.fill.image};
          padding-inline-start: 1em;
          margin-inline-start: -1em;
        `
      : ""}
`;

const ButtonWrapper = styled.div`
  margin-block-start: 72px;

  button {
    margin: auto;
  }
`;

const CategoryButton = styled(Button)`
  border: none;
  outline: none;
  background: transparent;

  &::before {
    width: 8px;
    height: 15px;
    aspect-ratio: unset;
  }
`;

const FilterPill = styled.span`
  display: inline-block;
  padding-inline: 1em;
  margin-inline-end: 1em;
  border: solid ${(props) => props.theme.colors.secondary[50]} 1px;
  border-radius: 100px;
  color: ${(props) => props.theme.colors.secondary[50]};
`;

interface FilterPillContainerProps {
  showMd?: boolean;
}

const FilterPillContainer = styled.div<FilterPillContainerProps>`
  width: 100%;
  margin-bottom: 2em;
  white-space: nowrap;
  overflow-x: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: ${(props) => (props.showMd ? "block" : "none")};
  }
`;

export const Shop = function renderShopPage() {
  const theme = useTheme();

  // const initRange: [number, number] = [Math.floor(0), Math.ceil(99999)];

  const [range, setRange] = useState<[number, number]>();
  const [selectedCateg, setSelectedCateg] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [initRange, setInitRange] = useState<[number, number]>();

  const filter: Params = {
    priceRange: range,
    titleIncludes: searchString,
    offset: (page - 1) * 8,
  };

  const { data: categories, status: categoriesStatus } = useQuery(["categories"], getCategories);

  const { data: products, status: productsStatus } = useQuery(["products", { selectedCateg, range, searchString, page }], () =>
    getCategoryProducts(selectedCateg, { limit: 8, ...filter })
  );

  const { data: stats, status: statsStatus } = useQuery(["stats", { selectedCateg, searchString }], () =>
    getProductStats(selectedCateg, _.omit(filter, "priceRange", "offset"))
  );

  const { data: topProducts, status: topProductsStatus } = useQuery(["topProducts"], () =>
    getProducts({ sort: "desc", comparePath: ["rating", "rate"], limit: 6 })
  );

  useEffect(() => {
    if (stats) {
      setInitRange([stats.min, stats.max]);
      setRange([stats.min, stats.max]);
    }
  }, [stats]);

  function updateCateg(categ: string) {
    setSelectedCateg(categ);
    setPage(1);
  }

  if (categoriesStatus !== "success" || !range) return <></>;

  const rangeChanged = stats && !_.chain(initRange).difference(range).isEmpty().value();
  const shouldShowFilterContainer = rangeChanged || selectedCateg || searchString;

  const pages = stats ? Math.ceil(stats.count / 8) : 1;

  return (
    <>
      <Banner particles={2}>
        <Display weight="bold">
          Home Shopping, <br /> Your Choice!
        </Display>
        <P>
          <Body1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body1>
        </P>
      </Banner>
      <Section>
        <ShopWrapper>
          <FilterWrapper>
            <Input
              value={searchString}
              onChange={({ target }) => setSearchString(target.value)}
              type="text"
              placeholder="Search products"
              icon="search"
              outline
            />
            <div>
              <FilterSection showSm>
                <SpaceBetween>
                  <H5 weight="bold" color={theme.colors.text.title}>
                    Price
                  </H5>
                  <Widget icon="filter" />
                </SpaceBetween>
                <div>
                  {statsStatus === "success" && (
                    <RangeSlider min={Math.floor(stats.min)} max={Math.ceil(stats.max)} step={50} value={range} onInput={setRange} />
                  )}
                  <SpaceBetween>
                    <Body1>Range</Body1>
                    <Body1>
                      ${range[0]}-${range[1]}
                    </Body1>
                  </SpaceBetween>
                </div>
              </FilterSection>
              <FilterSection>
                <H5 weight="bold" color={theme.colors.text.title}>
                  Product Categories
                </H5>
                <SpaceBetween selected={!selectedCateg}>
                  <Menu1>All</Menu1>
                  <CategoryButton onClick={() => updateCateg("")} iconLeft="arrowSharpRight" border="circle" color={theme.colors.base.black} onlyIcon outline />
                </SpaceBetween>
                {categories.map((category) => (
                  <SpaceBetween key={category} selected={category === selectedCateg}>
                    <Menu1>{category}</Menu1>
                    <CategoryButton
                      onClick={() => updateCateg(category)}
                      iconLeft="arrowSharpRight"
                      border="circle"
                      color={theme.colors.base.black}
                      onlyIcon
                      outline
                    />
                  </SpaceBetween>
                ))}
              </FilterSection>
              <FilterSection>
                <H5 weight="bold" color={theme.colors.text.title}>
                  Featured Product
                </H5>
                {topProductsStatus === "success" && topProducts.map((product) => <Card4 product={product} />)}
              </FilterSection>
            </div>
          </FilterWrapper>
          <div style={{ width: "100%" }}>
            <FilterPillContainer>
              <FilterPill onClick={() => updateCateg("")}>
                <Body1>All</Body1>
              </FilterPill>
              {categories.map((category) => (
                <FilterPill key={category} onClick={() => updateCateg(category)}>
                  <Body1>Category: "{category}"</Body1>
                </FilterPill>
              ))}
            </FilterPillContainer>
            {shouldShowFilterContainer && (
              <FilterPillContainer showMd>
                {searchString && (
                  <FilterPill>
                    <Body1>Title Includes: "{searchString}"</Body1>
                  </FilterPill>
                )}
                {selectedCateg && (
                  <FilterPill>
                    <Body1>In Category: "{selectedCateg}"</Body1>
                  </FilterPill>
                )}
                {rangeChanged && (
                  <FilterPill>
                    <Body1>
                      Price range: ${range[0]} → ${range[1]}
                    </Body1>
                  </FilterPill>
                )}
              </FilterPillContainer>
            )}
            {productsStatus === "success" && (
              <AutoGrid>
                {products.map((product) => (
                  <Card3 product={product} />
                ))}
              </AutoGrid>
            )}
            <ButtonWrapper>
              {page !== 1 && (
                <Button size="large" outline onClick={() => setPage(page - 1)}>
                  Previous Page
                </Button>
              )}
              {page !== pages && (
                <Button size="large" onClick={() => setPage(page + 1)}>
                  See More
                </Button>
              )}
            </ButtonWrapper>
          </div>
        </ShopWrapper>
      </Section>
    </>
  );
};
