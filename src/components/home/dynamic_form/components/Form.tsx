import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { CustomCheckbox, CustomInput, CustomRadio, CustomSelect} from './widgets'
import { InputProps, SchemaForm } from '../types'
import { Daum } from '../module/model/countryList'
import { CustomTextArea } from './widgets/customeTextArea'

interface Props {
	onSubmit: (data: unknown) => void
	labelButtonSubmit?: string
	titleForm?: string
	initialValues: unknown
	validationSchema: SchemaForm
	inputs: InputProps[]
	clist: Daum[]
}

export const Form = ({ ...props }: Props) => {
	const {
		initialValues,
		inputs,
		onSubmit,
		validationSchema,
		titleForm,
		labelButtonSubmit = 'Submit',
		clist
	} = props

	const formMethods = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: { ...(initialValues as any) }
	})

	const createInputs = () =>
		inputs.map(({ validations, typeValue, value, ...inputProps }) => {
			switch (inputProps.type) {
				case 'title':
					return <div className='py-2 h4'>{inputProps.label}</div>
				case 'select':
					return <CustomSelect {...inputProps} key={inputProps.name} />
				case 'checkbox':
					return <CustomCheckbox {...inputProps} key={inputProps.name} />
				case 'radio':
					return <CustomRadio {...inputProps} key={inputProps.name} />
				case 'textarea':
					return <CustomTextArea {...inputProps} key={inputProps.name} />
				default:
					return <CustomInput {...inputProps} key={inputProps.name} />
			}
		})

	return (
		<FormProvider {...formMethods}>
			<form
				onSubmit={formMethods.handleSubmit(onSubmit)}
				className='rounded-md p-10 pt-5 shadow-2xl shadow-primary/30 flex flex-col gap-2 w-full min-h-[390px]'
			>
				{/* {titleForm && (
					<h5 className='font-extrabold text-center text-2xl pb-2 mb-2 border-b border-white/50'>
						{titleForm}
					</h5>
				)} */}

				<section className='flex-1 flex flex-col gap-3'>{createInputs()}</section>

				{/* <div className='flex flex-col gap-2'>
					<div className='flex items-center gap-4'>
						<label htmlFor={"country"}>{"Country"}</label>
						<select id={"courynt"} className='p-2 rounded flex-1 text-black'>
							<option value=''>--- Select option ---</option>
							{clist &&
								clist.map(({ name }) => (
									<option key={name} value={name}>
										{name}
									</option>
								))}
						</select>
					</div>
				</div> */}
				<button
					className='btn btn-primary justify-center col-4 py-4 my-5'
					type='submit'
				>
					{labelButtonSubmit}
				</button>
			</form>
		</FormProvider>
	)
}

