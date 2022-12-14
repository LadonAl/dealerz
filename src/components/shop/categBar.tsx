import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Category, getCategories } from "../../services";
import { H5 } from "../primitives";

export const CategBarWrapper = styled.div`
  width: 100%;
  padding-block-start: 56px;
  padding-block-end: 72px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategBarFlex = styled.div`
  display: flex;
  justify-content: space-around;
  width: fit-content;
  padding-inline: 16px;
  margin-inline: auto;

  h5 {
    white-space: nowrap;
    color: ${(props) => props.theme.colors.text.body[2]};

    :not(:last-child) {
      padding-inline-end: 32px;
    }

    &.selected {
      color: ${(props) => props.theme.colors.secondary[50]};
    }

    cursor: pointer;
  }
`;

interface CategBarProps {
  onChangeCateg: (categ: string) => void;
}

export const CategBar: React.FC<CategBarProps> = function renderScrollableCategoryBar({ onChangeCateg }) {
  const { data, status } = useQuery(["categories"], getCategories);
  const [selectedCateg, setSelectedCateg] = useState<Category>("");

  function handleCategClick(categ: Category) {
    setSelectedCateg(categ);
    onChangeCateg(categ);
  }

  if (status !== "success") return <></>;

  return (
    <CategBarWrapper>
      <CategBarFlex>
        <H5 weight="bold" onClick={() => handleCategClick("")} className={!selectedCateg ? "selected" : ""}>
          All Products
        </H5>
        {data.map((categ) => (
          <H5 weight="bold" key={categ} onClick={() => handleCategClick(categ)} className={selectedCateg === categ ? "selected" : ""}>
            {categ}
          </H5>
        ))}
      </CategBarFlex>
    </CategBarWrapper>
  );
};
