import { FileInput, Label } from "flowbite-react";
import { handleDocuments } from "../services/documets.services";
import { findDocument } from "../../Admin/services/listUsers.services";
import { IconCheck2 } from "../../../assets/Icons";
import { useState } from "react";
import { AlertBasic } from "../../../components/Alerts";


export const Documents = ({ userInformation, setUserInformation }) => {
    const [openAlert, setOpenAlert] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const profileInput = e.target.querySelector('input');
        if (!profileInput.value) {
            setOpenAlert('info')
            setTimeout(() => {
                setOpenAlert(false)
            }, 2000);
        }else{
            handleDocuments(formData, userInformation, setUserInformation, setOpenAlert)
        }
        e.target.reset()
    }

    const user = findDocument(userInformation)

    return (
        <form onSubmit={handleSubmit} className="w-2/6 mx-auto">
            {openAlert === 'info' && <AlertBasic color={'info'} text={'Agregue un documento'} />}
            {openAlert === 'error' && <AlertBasic color={'warning'} text={'Error al agregar documento'} />}
            {openAlert === 'success' && <AlertBasic color={'success'} text={'Documento agregado correctamente'} />}
            <div className="flex flex-col gap-5">
                <div className="border border-transparent border-b-gray-500 p-5">
                    <div>
                        <Label htmlFor="product" value="Imagenes de productos" className="text-xl" />
                    </div>
                    <FileInput id="product" sizing="sm" className="inpDoc" name="product" multiple={true} />
                </div>
                <div className="border border-transparent border-b-gray-500 p-5">
                    {user.identificacion ?
                        <div className="flex gap-8 items-center">
                            <IconCheck2 />
                            <h3 className="text-2xl">Identificación</h3>
                        </div> :
                        <>
                            <div>
                                <Label htmlFor="documets" value="Identificación" className="text-xl" />
                            </div>
                            <FileInput id="documents" sizing="sm" className="inpDoc" name="documents" multiple={true} />
                        </>
                    }
                </div>
                <div className="border border-transparent border-b-gray-500 p-5">
                    {user.comprobanteDomicilio ?
                        <div className="flex gap-8 items-center">
                            <IconCheck2 />
                            <h3 className="text-2xl">Comprobante de domicilio</h3>
                        </div> :
                        <>
                            <div>
                                <Label htmlFor="documets-one-file-upload" value="Comprobante de domicilio" className="text-xl" />
                            </div>
                            <FileInput id="documets-one-file-upload" sizing="sm" className="inpDoc" name="documents" />
                        </>
                    }
                </div>
                <div className="border border-transparent border-b-gray-500 p-5">
                    {user.comprobanteDomicilio ?
                        <div className="flex gap-8 items-center">
                            <IconCheck2 />
                            <h3 className="text-2xl">Comprobante de domicilio</h3>
                        </div> :
                        <>
                            <div>
                                <Label htmlFor="documets-two-file-upload" value="Comprobante de estado de cuenta" className="text-xl" />
                            </div>
                            <FileInput id="documets-two-file-upload" sizing="sm" className="inpDoc" name="documents" />
                        </>
                    }
                </div>
            </div>
            <button type="submit" className="btns mx-auto">Agregar Documentos</button>
        </form >
    );
}
