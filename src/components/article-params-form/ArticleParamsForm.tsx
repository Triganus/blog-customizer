import { useCallback, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	isOpen: boolean;
	onToggleOpen: () => void;
	onClose: () => void;
	value: ArticleStateType;
	onChange: (next: Partial<ArticleStateType>) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: Props) => {
	const { isOpen, onToggleOpen, onClose, value, onChange, onApply, onReset } =
		props;

	const rootRef = useRef<HTMLDivElement>(null);

	// Закрываем сайдбар при клике вне
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: (newValue) => {
			if (!newValue) onClose();
		},
	});

	const handleFontFamilyChange = useCallback<
		(selected: ArticleStateType['fontFamilyOption']) => void
	>((selected) => onChange({ fontFamilyOption: selected }), [onChange]);

	const handleFontSizeChange = useCallback<
		(selected: ArticleStateType['fontSizeOption']) => void
	>((selected) => onChange({ fontSizeOption: selected }), [onChange]);

	const handleFontColorChange = useCallback(
		(selected: ArticleStateType['fontColor']) =>
			onChange({ fontColor: selected }),
		[onChange]
	);

	const handleBgColorChange = useCallback(
		(selected: ArticleStateType['backgroundColor']) =>
			onChange({ backgroundColor: selected }),
		[onChange]
	);

	const handleWidthChange = useCallback(
		(selected: ArticleStateType['contentWidth']) =>
			onChange({ contentWidth: selected }),
		[onChange]
	);

	const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
		(e) => {
			e.preventDefault();
			onApply();
		},
		[onApply]
	);

	const handleReset = useCallback<React.FormEventHandler<HTMLFormElement>>(
		(e) => {
			e.preventDefault();
			onReset();
		},
		[onReset]
	);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggleOpen} />
			<aside
				className={
					isOpen
						? styles.container + ' ' + styles.container_open
						: styles.container
				}
				ref={rootRef}
				data-testid='sidebar'>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={value.fontFamilyOption}
						onChange={handleFontFamilyChange}
						placeholder='Выберите шрифт'
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={value.fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={value.fontColor}
						onChange={handleFontColorChange}
						placeholder='Цвет текста'
					/>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={value.backgroundColor}
						onChange={handleBgColorChange}
						placeholder='Цвет фона'
					/>
					<Select
						title='Ширина контейнера'
						options={contentWidthArr}
						selected={value.contentWidth}
						onChange={handleWidthChange}
						placeholder='Ширина'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
