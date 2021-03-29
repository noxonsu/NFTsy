import React, {useState} from "react";

import {ERROR_ADDRESS_TEXT, validateAddress} from "../../utils/validator";

import {FormCustomProps} from "../Form/Form";
import {Button} from "../Button/Button";

import '../Form/Form.css';
import {Input} from "../Input/Input";

export const FormAddress = ({ contractMain, setErrors, setIsDone, currentAccount }: FormCustomProps) => {
    const [addressToApprove, setAddressToApprove] = useState('');
    const handleChangeAddressToApprove = (e: React.ChangeEvent<HTMLInputElement>) => setAddressToApprove(e.target.value);
    const handleSubmitApprove = async () => {
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
        <div className='Form'>
            <Input title='Address' value={addressToApprove} type='text' onChange={handleChangeAddressToApprove} />
            <Button onClick={handleSubmitApprove} text='Approve' disabled={!addressToApprove} />
        </div>
    );
};
