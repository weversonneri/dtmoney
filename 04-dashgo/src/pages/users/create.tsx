import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/SideBar';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type CreateUserFormData = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
	name: yup.string().required('Opa... Faltou seu nome'),
	email: yup
		.string()
		.required('Você simplesmente deixou de digitar seu email')
		.email('Meteu essa! Esse email não é valido'),
	password: yup
		.string()
		.required('Ih!. Esqueceu de digitar sua senha')
		.min(6, '6'),
	password_confirmation: yup
		.string()
		.oneOf([null, yup.ref('password')], 'confirma'),
});

export default function CreateUser() {
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(createUserFormSchema),
	});

	const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
		values
	) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log(values);
	};

	return (
		<Box>
			<Header />
			<Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
				<Sidebar />

				<Box
					as='form'
					flex='1'
					borderRadius={8}
					bg='gray.800'
					p={['6', '8']}
					onSubmit={handleSubmit(handleCreateUser)}
				>
					<Heading size='lg' fontWeight='normal'>
						Criar usuário
					</Heading>

					<Divider my='6' borderColor='gray.700' />

					<VStack spacing='8'>
						<SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
							<Input
								name='name'
								label='Nome completo'
								{...register('name')}
								error={formState.errors.name}
							/>
							<Input
								name='email'
								type='email'
								label='E-mail'
								{...register('email')}
								error={formState.errors.email}
							/>
						</SimpleGrid>

						<SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
							<Input
								name='password'
								type='password'
								label='Senha'
								{...register('password')}
								error={formState.errors.password}
							/>
							<Input
								name='password_confirmation'
								type='password'
								label='Confirmação da senha'
								{...register('password_confirmation')}
								error={formState.errors.password_confirmation}
							/>
						</SimpleGrid>
					</VStack>

					<Flex mt='8' justify='flex-end'>
						<HStack spacing='4'>
							<Link href='/users' passHref>
								<Button as='a' colorScheme='whiteAlpha'>
									Cancelar
								</Button>
							</Link>
							<Button
								type='submit'
								isLoading={formState.isSubmitting}
								colorScheme='pink'
							>
								Salvar
							</Button>
						</HStack>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
}
