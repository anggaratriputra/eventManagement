import {
	Avatar,
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	chakra,
	Link,
	Stack,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	useColorModeValue,
	ButtonGroup,
	FormHelperText,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import "../index.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import Regist from "../pages/Regist";
import api from "../api";
import { List, ListItem } from "@chakra-ui/react";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Navigation() {
	const [showPassword, setShowPassword] = useState(false);
	const [activeModal, setActiveModal] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
	const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);
	const [events, setEvents] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [isFocused, setIsFocused] = useState(false);

	// handle Input section
	useEffect(() => {
		api.get("/events").then((res) => {
			setEvents(res.data);
		});
	}, []);

	useEffect(() => {
		const filtered = events.filter((event) =>
			event.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredEvents(filtered);
	}, [searchQuery, events]);

	const handleSearchInputChange = (event) => {
		const input = event.target.value;
		setSearchQuery(input);

		// Filter suggestions berdasarkan input
		const filtered = events.filter((event) =>
			event.name.toLowerCase().includes(input.toLowerCase())
		);

		setSuggestions(filtered);
	};

	const handleSearchInputFocus = () => {
		setIsFocused(true);
	};

	const handleSearchInputBlur = () => {
		setIsFocused(false);
	};

	// Suggestion component
	const Suggestions = ({ suggestions }) => {
		if (suggestions.length === 0) {
			return null;
		}

		return (
			<Box
				mt={2}
				bg="white"
				borderRadius="md"
				boxShadow="md"
				position="absolute"
				width="100%"
				p={"10px"}>
				<List>
					{suggestions.map((event) => (
						<ListItem
							key={event.id}
							className="name">
							{event.name}
						</ListItem>
					))}
				</List>
			</Box>
		);
	};

	// end of handle Input section

	const openModal = (modal) => {
		setActiveModal(modal);
	};

	const closeModal = () => {
		setActiveModal(null);
	};

	const handleShowClick = () => setShowPassword(!showPassword);

	return (
		<>
			<Box
				display={"flex"}
				justifyContent={"space-evenly"}
				bg={"#331F69"}
				alignItems={"center"}
				h={"10vh"}>
				<Text
					fontSize={"2xl"}
					fontWeight={"bold"}
					px={"15px"}
					color={"white"}
					borderRadius={"md"}>
					<a href={"/"}>myTix</a>
				</Text>
				<div style={{ position: "relative" }}>
					<Input
						size={"md"}
						placeholder="Search an event..."
						w={"md"}
						shadow={"sm"}
						bg={"white"}
						value={searchQuery}
						onChange={handleSearchInputChange}
						onFocus={handleSearchInputFocus}
						onBlur={handleSearchInputBlur}
					/>
					<Suggestions suggestions={isFocused ? suggestions : []} />
				</div>
				<ButtonGroup>
					<Button
						bgColor="#331F69"
						color={"white"}
						_hover={{ bg: "#24105c" }}
						className="btn-nav-discover">
						<a href="#discover">DISCOVER</a>
					</Button>
					<Button
						bg={"#3E60C1"}
						color={"white"}
						className="btn-nav"
						onClick={openModalLogin}>
						LOGIN
					</Button>
					<Button
						bg={"#F7F7F7"}
						color={"#2e4583"}
						onClick={openModalRegister}>
						REGISTER
					</Button>
				</ButtonGroup>
			</Box>
			<Modal
				isOpen={isModalOpenLogin}
				onClose={closeModalLogin}
				isCentered>
				<ModalOverlay />
				<ModalContent
					bg="ghostwhite"
					size="xl">
					<ModalCloseButton />
					<ModalBody>
						<Flex
							minH={"10vh"}
							align={"center"}
							justify={"center"}
							bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.800")}>
							<Flex
								flexDirection="column"
								width="50wh"
								height="50vh"
								backgroundColor="transparent"
								justifyContent="center"
								alignItems="center">
								<Stack
									flexDir="column"
									mb="2"
									justifyContent="center"
									alignItems="center">
									<Avatar bg="blue.700" />
									<Heading color="blue.600">Welcome</Heading>
									<Box minW={{ base: "90%", md: "468px" }}>
										<form>
											<Stack
												spacing={4}
												p="2rem"
												backgroundColor="transparent">
												<FormControl>
													<InputGroup>
														<InputLeftElement
															pointerEvents="none"
															children={<CFaUserAlt color="gray.300" />}
														/>
														<Input
															type="email"
															placeholder="email address"
														/>
													</InputGroup>
												</FormControl>
												<FormControl>
													<InputGroup>
														<InputLeftElement
															pointerEvents="none"
															color="gray.300"
															children={<CFaLock color="gray.300" />}
														/>
														<Input
															type={showPassword ? "text" : "password"}
															placeholder="Password"
														/>
														<InputRightElement h={"full"}>
															<Button
																variant={"ghost"}
																onClick={() =>
																	setShowPassword(
																		(showPassword) => !showPassword
																	)
																}>
																{showPassword ? <ViewIcon /> : <ViewOffIcon />}
															</Button>
														</InputRightElement>
													</InputGroup>
													<FormHelperText textAlign="right">
														<Link>forgot password?</Link>
													</FormHelperText>
												</FormControl>
												<Button
													borderRadius={0}
													type="submit"
													variant="solid"
													colorScheme="blue"
													width="full">
													Login
												</Button>
											</Stack>
										</form>
									</Box>
								</Stack>
								<Box>
									New to us?{" "}
									<Link
										color="blue.500"
										onClick={openModalRegister}>
										Sign Up
									</Link>
								</Box>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal
				isOpen={isModalOpenRegister}
				onClose={closeModalRegister}
				isCentered>
				<ModalOverlay />
				<ModalContent
					bg="ghostwhite"
					size="xl">
					<ModalCloseButton />
					<ModalBody>
						<Flex
							minH={"10vh"}
							align={"center"}
							justify={"center"}
							bg={useColorModeValue("whiteAlpha.50", "whiteAlpha.800")}>
							<Stack
								spacing={3}
								mx={"auto"}
								maxW={"lg"}
								py={12}
								px={6}>
								<Stack
									align={"center"}
									flexDir="column"
									mb="2"
									justifyContent="center"
									alignItems="center">
									<Avatar bg="blue.700" />
									<Heading color="blue.600">Sign Up</Heading>
								</Stack>
								<Box
									rounded={"lg"}
									bg="ghostwhite"
									p={8}>
									<Stack spacing={4}>
										<HStack>
											<Box>
												<FormControl
													id="firstName"
													isRequired>
													<FormLabel>First Name</FormLabel>
													<Input type="text" />
												</FormControl>
											</Box>
											<Box>
												<FormControl id="lastName">
													<FormLabel>Last Name</FormLabel>
													<Input type="text" />
												</FormControl>
											</Box>
										</HStack>
										<FormControl
											id="email"
											isRequired>
											<FormLabel>Email address</FormLabel>
											<Input type="email" />
										</FormControl>
										<FormControl
											id="password"
											isRequired>
											<FormLabel>Password</FormLabel>
											<InputGroup>
												<Input type={showPassword ? "text" : "password"} />
												<InputRightElement h={"full"}>
													<Button
														variant={"ghost"}
														onClick={() =>
															setShowPassword((showPassword) => !showPassword)
														}>
														{showPassword ? <ViewIcon /> : <ViewOffIcon />}
													</Button>
												</InputRightElement>
											</InputGroup>
										</FormControl>
										<Stack
											spacing={10}
											pt={2}>
											<Button
												loadingText="Submitting"
												size="lg"
												bg={"blue.400"}
												color={"white"}
												_hover={{ bg: "blue.500" }}>
												Sign up
											</Button>
										</Stack>
										<Stack pt={6}>
											<Text align={"center"}>
												Already a user?{" "}
												<Link
													color={"blue.400"}
													onClick={openModalLogin}>
													Login
												</Link>
											</Text>
										</Stack>
									</Stack>
								</Box>
							</Stack>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
