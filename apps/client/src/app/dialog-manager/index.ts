import { createDialogWrapper } from "dialog-manager-react";
import {lazy} from "react";

const Dialogs = {
  confirmation: lazy(() => import('./dialogs/ConfirmationDialog')),
  addColumn: lazy(() => import('./dialogs/AddColumnDialog'))
}

const { DialogManager, useDialogs } = createDialogWrapper(Dialogs)

export { DialogManager, useDialogs }
