export const mail = (obj, products) => {

    let product = products.map(product => {
        return (
            `<tr>
        <td class="esdev-adapt-off" align="left"
            style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
            <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none"
                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                <tr>
                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                        <table cellpadding="0" cellspacing="0" class="es-left"
                            align="left" role="none"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                            <tr>
                                <td class="es-m-p0r" align="center"
                                    style="padding:0;Margin:0;width:70px">
                                    <table cellpadding="0" cellspacing="0" width="100%"
                                        role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr>
                                            <td align="center"
                                                style="padding:0;Margin:0;font-size:0px">
                                                <img class="adapt-img"
                                                    src=${product.product.thumbnails.one}
                                                    alt
                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                    width="70"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="padding:0;Margin:0;width:20px"></td>
                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                        <table cellpadding="0" cellspacing="0" class="es-left"
                            align="left" role="none"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                            <tr>
                                <td align="center"
                                    style="padding:0;Margin:0;width:265px">
                                    <table cellpadding="0" cellspacing="0" width="100%"
                                        role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr>
                                            <td align="left" style="padding:0;Margin:0">
                                                <p
                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                    <strong>${product.product.title}</strong></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="padding:0;Margin:0;width:20px"></td>
                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                        <table cellpadding="0" cellspacing="0" class="es-left"
                            align="left" role="none"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                            <tr>
                                <td align="left" style="padding:0;Margin:0;width:80px">
                                    <table cellpadding="0" cellspacing="0" width="100%"
                                        role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr>
                                            <td align="center"
                                                style="padding:0;Margin:0">
                                                <p
                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                    Cantidad ${product.quantity}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="padding:0;Margin:0;width:20px"></td>
                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                        <table cellpadding="0" cellspacing="0" class="es-right"
                            align="right" role="none"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                            <tr>
                                <td align="left" style="padding:0;Margin:0;width:85px">
                                    <table cellpadding="0" cellspacing="0" width="100%"
                                        role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr>
                                            <td align="right"
                                                style="padding:0;Margin:0">
                                                <p
                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                    $ ${product.product.price}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>`
        )
    })

    return (
        `
 <!DOCTYPE html
 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="es">

<head>
 <meta charset="UTF-8">
 <meta content="width=device-width, initial-scale=1" name="viewport">
 <meta name="x-apple-disable-message-reformatting">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta content="telephone=no" name="format-detection">
 <title>New Message</title><!--[if (mso 16)]>
 <style type="text/css">
 a {text-decoration: none;}
 </style>
 <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
 <o:OfficeDocumentSettings>
 <o:AllowPNG></o:AllowPNG>
 <o:PixelsPerInch>96</o:PixelsPerInch>
 </o:OfficeDocumentSettings>
</xml>
<![endif]-->
 <style type="text/css">
     #outlook a {
         padding: 0;
     }

     .es-button {
         mso-style-priority: 100 !important;
         text-decoration: none !important;
     }

     a[x-apple-data-detectors] {
         color: inherit !important;
         text-decoration: none !important;
         font-size: inherit !important;
         font-family: inherit !important;
         font-weight: inherit !important;
         line-height: inherit !important;
     }

     .es-desk-hidden {
         display: none;
         float: left;
         overflow: hidden;
         width: 0;
         max-height: 0;
         line-height: 0;
         mso-hide: all;
     }

     @media only screen and (max-width:600px) {

         p,
         ul li,
         ol li,
         a {
             line-height: 150% !important
         }

         h1,
         h2,
         h3,
         h1 a,
         h2 a,
         h3 a {
             line-height: 120% !important
         }

         h1 {
             font-size: 36px !important;
             text-align: left
         }

         h2 {
             font-size: 26px !important;
             text-align: left
         }

         h3 {
             font-size: 20px !important;
             text-align: left
         }

         .es-header-body h1 a,
         .es-content-body h1 a,
         .es-footer-body h1 a {
             font-size: 36px !important;
             text-align: left
         }

         .es-header-body h2 a,
         .es-content-body h2 a,
         .es-footer-body h2 a {
             font-size: 26px !important;
             text-align: left
         }

         .es-header-body h3 a,
         .es-content-body h3 a,
         .es-footer-body h3 a {
             font-size: 20px !important;
             text-align: left
         }

         .es-menu td a {
             font-size: 12px !important
         }

         .es-header-body p,
         .es-header-body ul li,
         .es-header-body ol li,
         .es-header-body a {
             font-size: 14px !important
         }

         .es-content-body p,
         .es-content-body ul li,
         .es-content-body ol li,
         .es-content-body a {
             font-size: 14px !important
         }

         .es-footer-body p,
         .es-footer-body ul li,
         .es-footer-body ol li,
         .es-footer-body a {
             font-size: 14px !important
         }

         .es-infoblock p,
         .es-infoblock ul li,
         .es-infoblock ol li,
         .es-infoblock a {
             font-size: 12px !important
         }

         *[class="gmail-fix"] {
             display: none !important
         }

         .es-m-txt-c,
         .es-m-txt-c h1,
         .es-m-txt-c h2,
         .es-m-txt-c h3 {
             text-align: center !important
         }

         .es-m-txt-r,
         .es-m-txt-r h1,
         .es-m-txt-r h2,
         .es-m-txt-r h3 {
             text-align: right !important
         }

         .es-m-txt-l,
         .es-m-txt-l h1,
         .es-m-txt-l h2,
         .es-m-txt-l h3 {
             text-align: left !important
         }

         .es-m-txt-r img,
         .es-m-txt-c img,
         .es-m-txt-l img {
             display: inline !important
         }

         .es-button-border {
             display: inline-block !important
         }

         a.es-button,
         button.es-button {
             font-size: 20px !important;
             display: inline-block !important
         }

         .es-adaptive table,
         .es-left,
         .es-right {
             width: 100% !important
         }

         .es-content table,
         .es-header table,
         .es-footer table,
         .es-content,
         .es-footer,
         .es-header {
             width: 100% !important;
             max-width: 600px !important
         }

         .es-adapt-td {
             display: block !important;
             width: 100% !important
         }

         .adapt-img {
             width: 100% !important;
             height: auto !important
         }

         .es-m-p0 {
             padding: 0 !important
         }

         .es-m-p0r {
             padding-right: 0 !important
         }

         .es-m-p0l {
             padding-left: 0 !important
         }

         .es-m-p0t {
             padding-top: 0 !important
         }

         .es-m-p0b {
             padding-bottom: 0 !important
         }

         .es-m-p20b {
             padding-bottom: 20px !important
         }

         .es-mobile-hidden,
         .es-hidden {
             display: none !important
         }

         tr.es-desk-hidden,
         td.es-desk-hidden,
         table.es-desk-hidden {
             width: auto !important;
             overflow: visible !important;
             float: none !important;
             max-height: inherit !important;
             line-height: inherit !important
         }

         tr.es-desk-hidden {
             display: table-row !important
         }

         table.es-desk-hidden {
             display: table !important
         }

         td.es-desk-menu-hidden {
             display: table-cell !important
         }

         .es-menu td {
             width: 1% !important
         }

         table.es-table-not-adapt,
         .esd-block-html table {
             width: auto !important
         }

         table.es-social {
             display: inline-block !important
         }

         table.es-social td {
             display: inline-block !important
         }

         .es-m-p5 {
             padding: 5px !important
         }

         .es-m-p5t {
             padding-top: 5px !important
         }

         .es-m-p5b {
             padding-bottom: 5px !important
         }

         .es-m-p5r {
             padding-right: 5px !important
         }

         .es-m-p5l {
             padding-left: 5px !important
         }

         .es-m-p10 {
             padding: 10px !important
         }

         .es-m-p10t {
             padding-top: 10px !important
         }

         .es-m-p10b {
             padding-bottom: 10px !important
         }

         .es-m-p10r {
             padding-right: 10px !important
         }

         .es-m-p10l {
             padding-left: 10px !important
         }

         .es-m-p15 {
             padding: 15px !important
         }

         .es-m-p15t {
             padding-top: 15px !important
         }

         .es-m-p15b {
             padding-bottom: 15px !important
         }

         .es-m-p15r {
             padding-right: 15px !important
         }

         .es-m-p15l {
             padding-left: 15px !important
         }

         .es-m-p20 {
             padding: 20px !important
         }

         .es-m-p20t {
             padding-top: 20px !important
         }

         .es-m-p20r {
             padding-right: 20px !important
         }

         .es-m-p20l {
             padding-left: 20px !important
         }

         .es-m-p25 {
             padding: 25px !important
         }

         .es-m-p25t {
             padding-top: 25px !important
         }

         .es-m-p25b {
             padding-bottom: 25px !important
         }

         .es-m-p25r {
             padding-right: 25px !important
         }

         .es-m-p25l {
             padding-left: 25px !important
         }

         .es-m-p30 {
             padding: 30px !important
         }

         .es-m-p30t {
             padding-top: 30px !important
         }

         .es-m-p30b {
             padding-bottom: 30px !important
         }

         .es-m-p30r {
             padding-right: 30px !important
         }

         .es-m-p30l {
             padding-left: 30px !important
         }

         .es-m-p35 {
             padding: 35px !important
         }

         .es-m-p35t {
             padding-top: 35px !important
         }

         .es-m-p35b {
             padding-bottom: 35px !important
         }

         .es-m-p35r {
             padding-right: 35px !important
         }

         .es-m-p35l {
             padding-left: 35px !important
         }

         .es-m-p40 {
             padding: 40px !important
         }

         .es-m-p40t {
             padding-top: 40px !important
         }

         .es-m-p40b {
             padding-bottom: 40px !important
         }

         .es-m-p40r {
             padding-right: 40px !important
         }

         .es-m-p40l {
             padding-left: 40px !important
         }

         .es-desk-hidden {
             display: table-row !important;
             width: auto !important;
             overflow: visible !important;
             max-height: inherit !important
         }
     }

     @media screen and (max-width:384px) {
         .mail-message-content {
             width: 414px !important
         }
     }
 </style>
</head>

<body
 style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
 <div dir="ltr" class="es-wrapper-color" lang="es" style="background-color:#FAFAFA"><!--[if gte mso 9]>
         <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
             <v:fill type="tile" color="#fafafa"></v:fill>
         </v:background>
     <![endif]-->
     <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none"
         style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
         <tr>
             <td valign="top" style="padding:0;Margin:0">
                 <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none"
                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                     <tr>
                         <td align="center" style="padding:0;Margin:0">
                             <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0"
                                 cellspacing="0" role="none"
                                 style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
                                 <tr>
                                     <td align="left" style="padding:20px;Margin:0">
                                         <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                             <tr>
                                                 <td class="es-m-p0r" valign="top" align="center"
                                                     style="padding:0;Margin:0;width:560px">
                                                     <table cellpadding="0" cellspacing="0" width="100%"
                                                         role="presentation"
                                                         style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr>
                                                             <td align="center" bgcolor="#6ea7df"
                                                                 style="padding:0;Margin:0">
                                                                 <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:56px;color:#333333;font-size:28px">
                                                                     <strong>CSport</strong></p>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </table>
                                     </td>
                                 </tr>
                             </table>
                         </td>
                     </tr>
                 </table>
                 <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none"
                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                     <tr>
                         <td align="center" style="padding:0;Margin:0">
                             <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                 cellspacing="0" role="none"
                                 style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                 <tr>
                                     <td align="left"
                                         style="padding:0;Margin:0;padding-top:15px;padding-left:20px;padding-right:20px">
                                         <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                             <tr>
                                                 <td align="center" valign="top"
                                                     style="padding:0;Margin:0;width:560px">
                                                     <table cellpadding="0" cellspacing="0" width="100%"
                                                         role="presentation"
                                                         style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr>
                                                             <td align="center"
                                                                 style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px">
                                                                 <img src="https://finfvrj.stripocdn.email/content/guids/CABINET_d115780a8db97fde638c14bb30ba52b3dbd9fe44670da63f45f3831db832b38e/images/logo.png"
                                                                     alt
                                                                     style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                     width="100"></td>
                                                         </tr>
                                                         <tr>
                                                             <td align="center" class="es-m-txt-c"
                                                                 style="padding:0;Margin:0;padding-bottom:10px">
                                                                 <h1
                                                                     style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">
                                                                     <strong>Gracias por tu compra</strong></h1>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </table>
                                     </td>
                                 </tr>
                             </table>
                         </td>
                     </tr>
                 </table>
                 <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none"
                     style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                     <tr>
                         <td align="center" style="padding:0;Margin:0">
                             <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0"
                                 cellspacing="0" role="none"
                                 style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                 <tr>
                                     <td align="left" style="padding:20px;Margin:0">
                                         <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                             <tr>
                                                 <td align="center" valign="top"
                                                     style="padding:0;Margin:0;width:560px">
                                                     <table cellpadding="0" cellspacing="0" width="100%"
                                                         role="presentation"
                                                         style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr>
                                                             <td align="center" class="es-m-txt-c"
                                                                 style="padding:0;Margin:0">
                                                                 <h2
                                                                     style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#333333">
                                                                     Se genero el pedido N° ${obj.codeTicket} &nbsp;</h2>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </table>
                                     </td>
                                 </tr>
                                 ${product}
                                 <tr>
                                     <td align="left"
                                         style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px">
                                         <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                             <tr>
                                                 <td class="es-m-p0r" align="center"
                                                     style="padding:0;Margin:0;width:560px">
                                                     <table cellpadding="0" cellspacing="0" width="100%"
                                                         style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:2px solid #efefef;border-bottom:2px solid #efefef"
                                                         role="presentation">
                                                         <tr>
                                                             <td align="right" class="es-m-txt-r"
                                                                 style="padding:0;Margin:0;padding-top:10px;padding-bottom:20px">
                                                                 <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                     <strong>Subtotal: $ ${obj.detailPay.subTotal.toLocaleString()}&nbsp;<br>Envio: ${obj.detailPay.entrega == 'Gratis' ? obj.detailPay.entrega : `$ ${obj.detailPay.entrega.toLocaleString('es-AR')}`}&nbsp;<br>IVA: $ ${obj.detailPay.iva}&nbsp;<br>Total: $ ${obj.detailPay.total.toLocaleString()}&nbsp;</strong>
                                                                 </p>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </table>
                                     </td>
                                 </tr>
                                 <tr>
                                     <td align="left"
                                         style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px">
                                         <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:280px" valign="top"><![endif]-->
                                         <table cellpadding="0" cellspacing="0" class="es-left" align="left"
                                             role="none"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                             <tr>
                                                 <td class="es-m-p0r es-m-p20b" align="center"
                                                     style="padding:0;Margin:0;width:280px">
                                                     <table cellpadding="0" cellspacing="0" width="100%"
                                                         role="presentation"
                                                         style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr>
                                                             <td align="left" style="padding:0;Margin:0">
                                                                 <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                     <strong>Pedido N°: ${obj.codeTicket}</strong></p>
                                                                 <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                     <strong>Fecha de Factura: ${obj.purchase_datetime}&nbsp;</strong></p>
                                                                 <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                     <br></p>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </table>
                                         <!--[if mso]></td><td style="width:0px"></td><td style="width:280px" valign="top"><![endif]-->
                                         <table cellpadding="0" cellspacing="0" class="es-right" align="right"
                                             role="none"
                                             style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                             <tr>
                                                 <td class="es-m-p0r" align="center"
                                                     style="padding:0;Margin:0;width:280px">
                                                     <table cellpadding="0" cellspacing="0" width="100%"
                                                         role="presentation"
                                                         style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr>
                                                             <td align="left" class="es-m-txt-l"
                                                                 style="padding:0;Margin:0">
                                                                 <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                     <strong>Datos de envío:</strong></p>
                                                                     <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                     <strong>Nombre Completo: ${obj.shippingDetail.name}</strong></p>
                                                                 <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                     <strong>Dirección: ${obj.shippingDetail.address}</strong></p>
                                                                 <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                     <strong>Localidad: ${obj.shippingDetail.city}</strong></p>
                                                                 <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                     <strong>Provincia: ${obj.shippingDetail.state}</strong></p>
                                                                 <p
                                                                     style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                     <strong><br></strong></p>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </table><!--[if mso]></td></tr></table><![endif]-->
                                     </td>
                                 </tr>
                             </table>
                         </td>
                     </tr>
                 </table>
             </td>
         </tr>
     </table>
 </div>
</body>

</html>`)
}
