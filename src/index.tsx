import { createRoot } from 'react-dom/client';
import * as React from 'react';
import {
	StrictMode,
	CSSProperties,
	useMemo,
	useState,
	useCallback,
} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние, применённое к статье
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);
	// Черновик настроек в форме (не применяются до нажатия «Применить»)
	const [draftState, setDraftState] =
		useState<ArticleStateType>(defaultArticleState);
	// Открыт ли сайдбар
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	// CSS-переменные для статьи формируем из appliedState
	const cssVars = useMemo(
		() =>
			({
				'--font-family': appliedState.fontFamilyOption.value,
				'--font-size': appliedState.fontSizeOption.value,
				'--font-color': appliedState.fontColor.value,
				'--container-width': appliedState.contentWidth.value,
				'--bg-color': appliedState.backgroundColor.value,
			} as CSSProperties),
		[appliedState]
	);

	const handleToggleOpen = useCallback(
		() => setIsMenuOpen((v: boolean) => !v),
		[]
	);
	const handleClose = useCallback(() => setIsMenuOpen(false), []);

	const handleChange = useCallback((next: Partial<ArticleStateType>) => {
		setDraftState((prev: ArticleStateType) => ({ ...prev, ...next }));
	}, []);

	const handleApply = useCallback(() => {
		setAppliedState(draftState);
		setIsMenuOpen(false);
	}, [draftState]);

	const handleReset = useCallback(() => {
		// Сброс к начальному состоянию и немедленное применение
		setDraftState(defaultArticleState);
		setAppliedState(defaultArticleState);
		setIsMenuOpen(false);
	}, []);

	return (
		<div className={clsx(styles.main)} style={cssVars}>
			<ArticleParamsForm
				isOpen={isMenuOpen}
				onToggleOpen={handleToggleOpen}
				onClose={handleClose}
				value={draftState}
				onChange={handleChange}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
