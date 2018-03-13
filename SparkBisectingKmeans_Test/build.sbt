name := "SparkBisectingKmeans_Test"

version := "0.1"

scalaVersion := "2.11.8"


libraryDependencies ++= Seq(
  "org.scalanlp" %% "breeze" % "0.11.2",
  "org.apache.spark" %% "spark-core" % "2.2.0",
  "org.apache.spark" %% "spark-sql" % "2.2.0")
  //"org.apache.spark" %% "spark-mllib-local" % "2.2.0")
  //"org.apache.spark" %% "spark-mllib" % "2.2.0")


//added for Logging output from the log4j.properties file in the /src/main/resources/log4j.properties I added
fork in run := true
javaOptions in run ++= Seq(
  "-Dlog4j.debug=true",
  "-Dlog4j.configuration=log4j.properties")
outputStrategy := Some(StdoutOutput)
