<?php 
    include $_SERVER['DOCUMENT_ROOT'].'/dormitory/include/lib.php';
    $text = $_POST['inputText'];
    
    $query = $db->query("select * from notice");
    $db->query("UPDATE `notice` SET `idx`='1',`text`='$text',`read_chk`='0'");
    echo "<script>location.href='/dormitory/'</script>";
    
?>
