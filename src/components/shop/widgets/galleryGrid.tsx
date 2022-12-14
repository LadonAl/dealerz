import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Category, getCategoryProducts } from "../../../services";
import { AutoGrid, Button, H2, Section } from "../../primitives";
import { CategBar } from "../categBar";
import { ButtonWrapper, Card1 } from "../product";

interface GalleryGridProps extends React.PropsWithChildren {
  title: string;
}

export const GalleryGrid: React.FC<GalleryGridProps> = function renderGalleryGridWithCustomTitle({ title }) {
  const [selectedCateg, setSelectedCateg] = useState<Category>("");
  const { data, status } = useQuery(["products", selectedCateg], () => getCategoryProducts(selectedCateg, { limit: 6 }));
  const navigate = useNavigate();

  return (
    <Section>
      <H2 align="center" weight="bold">
        {title}
      </H2>
      <CategBar onChangeCateg={setSelectedCateg} />
      {status === "success" && (
        <AutoGrid>
          {data.map((product) => (
            <Card1 key={product.id} product={product} />
          ))}
        </AutoGrid>
      )}
      <ButtonWrapper>
        <Button size="large" onClick={() => navigate("/shop")}>
          Find out more
        </Button>
      </ButtonWrapper>
    </Section>
  );
};
