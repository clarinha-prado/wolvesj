import { Center, ButtonProps, Text } from "@chakra-ui/react";
import {
  Paginator,
  Container,
  Previous,
  Next,
  PageGroup,
  usePaginator
} from "chakra-paginator";
import { useEffect } from "react";

interface IPaginatorProps {
  page: {
    first: boolean;
    last: boolean;
    number: number;
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
  }
  requestNewPage: (newPage: number) => void;
}

export function Pagin(props: IPaginatorProps) {

  const { currentPage, setCurrentPage, offset } = usePaginator({
    initialState: { currentPage: props.page.number + 1 }
  });

  // handlers
  const handlePageChange = (nextPage: number) => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    props.requestNewPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const outerLimit = 1;
  const innerLimit = 1;

  const normalStyles: ButtonProps = {
    w: 7,
    h: 7,
    bg: "gray.200",
    fontSize: "sm",
    _hover: {
      bg: "gray.400"
    },
  };

  const activeStyles: ButtonProps = {
    w: 7,
    h: 7,
    bg: "#991143",
    color: "white",
    fontSize: "sm",
    _hover: {
      bg: "blue.300"
    },
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    h: 7,
    bg: "green.200"
  };

  return (
    <>
      <Center>
        <Paginator
          pagesQuantity={props.page.totalPages}
          currentPage={props.page.number + 1}
          onPageChange={handlePageChange}
          activeStyles={activeStyles}
          normalStyles={normalStyles}
          separatorStyles={separatorStyles}
          outerLimit={outerLimit}
          innerLimit={innerLimit}
        >
          <Container align="center" justify="space-between" w="full" p={4} maxW="550px">
            <Previous h="7">
              &lt;&lt;
              {/* Or an icon from `react-icons` */}
            </Previous>
            <PageGroup isInline align="center" />
            <Next h="7">
              &gt;&gt;
              {/* Or an icon from `react-icons` */}
            </Next>
          </Container>
        </Paginator>
      </Center>

      <Center>
        <Text fontSize="0.8rem" mb="2" mt="-1">
          Página {props.page.number + 1} de {props.page.totalPages},
          mostrando {props.page.numberOfElements} animais em um total de {props.page.totalElements}.
        </Text>
      </Center>
    </>
  );
}