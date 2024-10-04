import { Input } from "@nextui-org/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { encodeCategory } from "../views/Categories";
import baseURL from "../lib-axios/baseUrl";

const EditProduct = () => {
  //states
  const [product, setProduct] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const auctId = localStorage.getItem("auctId");
  const getProduct = async () => {
    try {
      const response = await axios.get(`${baseURL}/auctions/${auctId}`);
      setProduct(response.data);
      console.log("response", typeof response.data);
      // console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const categories = [
    { key: "Electronics", label: "Electronics" },
    { key: "Fashion & Accessories", label: "Fashion & Accessories" },
    { key: "Automotive", label: "Automotive" },
    { key: "Jewelry & Watches", label: "Jewelry & Watches" },
    { key: "Art & Antiques", label: "Art & Antiques" },
    { key: "Real Estate", label: "Real Estate" },
    { key: "Collectibles", label: "Collectibles" },
    { key: "Sports & Hobbies", label: "Sports & Hobbies" },
    { key: "Others", label: "Others" },
  ];

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      id: "",
      title: "",
      description: "",
      startingPrice: "",
      startDate: "",
      endDate: "",
      condition: "",
      category: "",
      status: "",
      userId: "",
    },
  });

  const handleClick = () => {
    form.reset({
      id: product.id,
      title: product.title,
      description: product.description,
      startingPrice: product.startingPrice,
      startDate: product.startDate,
      endDate: product.endDate,
      condition: product.condition,
      category: product.category,
      status: product.status,
      userId: product.userId,
      image: product.image,
    });
  };

  const updateBid = async (update) => {
    try {
      const response = await axios.put(`${baseURL}/auctions/${auctId}`, update);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const editPacket = (data) => {
    updateBid(data);
    const upTtitle = document.getElementById("productTitle");
    upTtitle.innerText = form.getValues("title");
    const upCategory = document.getElementById("ProductCategory");
    upCategory.innerText = form.getValues("category");
    const upDscription = document.getElementById("productDescription");
    upDscription.innerText = form.getValues("description");

    localStorage.setItem(
      "category",
      encodeCategory(form.getValues("category"))
    );

    toast.success("Product successfully edited");
  };

  //debug
  console.log("form", form.watch());
  console.log("product", product);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="ml-6 hidden">
      <Button
        id="editmodal"
        onClick={() => {
          handleClick();
          onOpen();
        }}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center">
                Edit Paket Laundry
              </ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(editPacket)}>
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        label="Title"
                        description="Product Title"
                        labelPlacement="outside"
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />

                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Textarea
                        label="Description"
                        description="Product Description"
                        labelPlacement="outside"
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                  {/* forselect */}
                  <Controller
                    name="category"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Select
                        classNames={{ mainWrapper: "mt-1" }}
                        items={categories}
                        label="Categories"
                        labelPlacement="outside"
                        placeholder="Select category"
                        description="Only one category"
                        defaultSelectedKeys={[`${product.category}`]}
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        scrollShadowProps={{ isEnabled: false }}
                      >
                        {(category) => (
                          <SelectItem>{category.label}</SelectItem>
                        )}
                      </Select>
                    )}
                  />

                  {/* hiddenInput */}
                  <Controller
                    name="id"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="hidden"
                      />
                    )}
                  />
                  <Controller
                    name="startingPrice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="hidden"
                      />
                    )}
                  />
                  <Controller
                    name="startDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="hidden"
                      />
                    )}
                  />
                  <Controller
                    name="endDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="hidden"
                      />
                    )}
                  />
                  <Controller
                    name="condition"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="hidden"
                      />
                    )}
                  />
                  <Controller
                    name="status"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="hidden"
                      />
                    )}
                  />
                  <Controller
                    name="userId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                        className="hidden"
                      />
                    )}
                  />

                  <Button
                    color="primary"
                    className="relative top-16"
                    type="submit"
                  >
                    Edit
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProduct;
