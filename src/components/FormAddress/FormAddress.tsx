import React, {useState} from "react";

import {ERROR_ADDRESS_TEXT, validateAddress} from "../../utils/validator";

import {FormCustomProps, Form} from "../Form/Form";

export const FormAddress = ({ contractMain, setErrors, setIsDone, currentAccount }: FormCustomProps) => {
    const [addressToApprove, setAddressToApprove] = useState('');
    const handleChangeAddressToApprove = (e: React.ChangeEvent<HTMLInputElement>) => setAddressToApprove(e.target.value);
    const handleSubmitApprove = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setErrors([]);
            setIsDone(false);
            const isValidAddressToApprove = validateAddress(addressToApprove);

            if (!isValidAddressToApprove) {
                setErrors((errors) => [...errors, ERROR_ADDRESS_TEXT]);
            }

            if (currentAccount && isValidAddressToApprove && contractMain) {
                await contractMain.methods.setApprovalForAll(addressToApprove, true).send({ from: currentAccount });
                setIsDone(true);
            }
        } catch (e) {
            setErrors([e.message]);
        }
    }

    return (
        <Form onSubmit={handleSubmitApprove}>
            <label className="Form__label">
                Address:
                <input className="Form__input" type="string" value={addressToApprove}
                       onChange={handleChangeAddressToApprove}/>
            </label>
            <input type="submit" className="Form__button" disabled={!addressToApprove} value="Approve"/>
        </Form>
    );
};
