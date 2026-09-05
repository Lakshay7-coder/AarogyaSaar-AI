import { useEffect, useRef, useState } from "react";
export const useVoice = ({ language = "en-IN" } = {}) => {
 const recognitionRef=useRef(null); const [listening,setListening]=useState(false); const [transcript,setTranscript]=useState("");
 useEffect(()=>{const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SpeechRecognition){recognitionRef.current=null;return undefined;}const recognition=new SpeechRecognition();recognition.continuous=false;recognition.interimResults=true;recognition.lang=language;recognition.onresult=(event)=>{let text="";for(let i=event.resultIndex;i<event.results.length;i++)text+=event.results[i][0].transcript;setTranscript(text)};recognition.onend=()=>setListening(false);recognition.onerror=()=>setListening(false);recognitionRef.current=recognition;return()=>{try{recognition.abort()}catch{}}},[language]);
 const startListening=()=>{if(!recognitionRef.current||listening)return false;setTranscript("");try{recognitionRef.current.start();setListening(true);return true}catch{return false}}; const stopListening=()=>{try{recognitionRef.current?.stop()}catch{}setListening(false)};
 const speak=(text)=>{if(!text||!window.speechSynthesis)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=language;u.rate=.9;window.speechSynthesis.speak(u)};
 return {listening,transcript,startListening,stopListening,speak};
};
