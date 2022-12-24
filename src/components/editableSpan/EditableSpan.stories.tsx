import React  from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const callback = action('Title changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan value={'Example'} onChange={callback} />

}
