<?php
        
        error_reporting(0);    
        header("Access-Control-Allow-Origin: *");
        function CurlSendPostRequest($url,$request)
    {
         $authentication = base64_encode("2b8ec1ece1a54345b8a27ffcfecd84d2:T9JRxN8ckEluP11x0Jp5JVmuwiNDiJRn");

        $ch = curl_init($url);
        $options = array(
                CURLOPT_RETURNTRANSFER => true,         // return web page
                CURLOPT_HEADER         => false,        // don't return headers
                CURLOPT_FOLLOWLOCATION => false,         // follow redirects
               // CURLOPT_ENCODING       => "utf-8",           // handle all encodings
                CURLOPT_AUTOREFERER    => true,         // set referer on redirect
                CURLOPT_CONNECTTIMEOUT => 20,          // timeout on connect
                CURLOPT_TIMEOUT        => 20,          // timeout on response
                CURLOPT_POST            => 1,            // i am sending post data
                CURLOPT_POSTFIELDS     => $request,    // this are my post vars
                CURLOPT_SSL_VERIFYHOST => 0,            // don't verify ssl
                CURLOPT_SSL_VERIFYPEER => false,        //
                CURLOPT_VERBOSE        => 1,
                CURLOPT_HTTPHEADER     => array(
                    "Authorization: Basic $authentication",
                    "Content-Type: application/x-www-form-urlencoded",
                    "cache-control: no-cache",
                )

        );

        curl_setopt_array($ch,$options);
        $data = curl_exec($ch);
        $curl_errno = curl_errno($ch);
        $curl_error = curl_error($ch);
        //echo $curl_errno;
        //echo $curl_error;
        curl_close($ch);
        echo $data;
        return $data;
    }
   
        if($_REQUEST['task']=='weblogin'){
            
           // $username =  $_REQUEST['username'];
            $code =  $_REQUEST['code'];
            $msg =  CurlSendPostRequest('https://accounts.paytm.com/oauth2/v2/token','grant_type=authorization_code&code=$code&client_id=2b8ec1ece1a54345b8a27ffcfecd84d2&scope=basic');
                $rtn_obj->rtnCode=1;
                $rtn_obj->rtnMSG=$msg;
                $rtn_obj->sqlERR=1;
                echo json_encode($rtn_obj); 
                exit;
           
            
        }

        elseif($_REQUEST['task']=='festivalsession'){
        }
         else{
            $rtn_obj->rtnCode=1;
            $rtn_obj->rtnMSG='Method Not Found ';
            $rtn_obj->sqlERR=1;
            echo json_encode($rtn_obj); 
            exit;
        }
            
?>
