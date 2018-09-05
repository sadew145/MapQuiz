<?php
	
	session_start();
	if(isset($_POST["start"])){
		$_SESSION["correctGuess"] = array();
		$_SESSION["count"]=0;
	}
	else if(isset($_POST["answer"])){
		$answer = $_POST["answer"];
		$xml = simplexml_load_file("countries.xml");
		$result = array();
		foreach($xml->country as $i) {
				if($i->name == $answer){
					if(!in_array("$answer", $_SESSION["correctGuess"])){
						array_push($_SESSION["correctGuess"], $answer);
						$_SESSION["count"]++;
						foreach($i->coord as $c){
						array_push($result, $c);
						}
						
						array_push($result, $_SESSION["count"]);
						array_push($result, $_SESSION["correctGuess"]);
						echo json_encode($result);
					}
					
					
				}
					
		}
	
	}
		
?>