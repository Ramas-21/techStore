import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [ newProduct, setNewProduct ] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast()

  const {createProduct} = useProductStore()
  const handleAddProduct = async () => {
    const {success,message} = await createProduct(newProduct)
    if(!success) {
      toast({
        title:"Error",
        description: message,
        status: "error",
        isClosable: true
      })
    } else {
      toast({
        title:"success",
        description: message,
        status: "success",
        isClosable: true
      })
    }
    setNewProduct({ name: "", price: "", image: ""});
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={0}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add New Product
        </Heading>
        <Box
          w={"full"}
          p={6}
          rounded={"lg"}
          shadow={"lg"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w='full'>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
