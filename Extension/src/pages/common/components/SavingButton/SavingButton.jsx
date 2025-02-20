import React from 'react';
import classnames from 'classnames';

import { STATES as SAVING_STATES } from '../Editor/savingFSM';
import { reactTranslator } from '../../../../common/translators/reactTranslator';
import { Icon } from '../ui/Icon';

const renderSavingState = (savingRulesState) => {
    const indicatorTextMap = {
        [SAVING_STATES.SAVED]: reactTranslator.getMessage('options_editor_indicator_saved'),
        [SAVING_STATES.SAVING]: reactTranslator.getMessage('options_editor_indicator_saving'),
    };

    const indicatorText = indicatorTextMap[savingRulesState] || '';

    if (indicatorText === '') {
        return null;
    }

    const indicatorClassnames = classnames('editor__label', {
        'editor__label--saved': savingRulesState === SAVING_STATES.SAVED,
    });

    return (
        <div className={indicatorClassnames}>
            <Icon id="#tick" classname="icon--checked editor__icon" />
            {indicatorText}
        </div>
    );
};

export const SavingButton = ({ onClick, savingState, contentChanged }) => {
    return (
        <div className="actions__saving">
            {renderSavingState(savingState)}
            <button
                type="button"
                className="button button--m button--green actions__btn"
                onClick={onClick}
                disabled={!contentChanged}
            >
                {reactTranslator.getMessage('options_editor_save')}
            </button>
        </div>
    );
};
