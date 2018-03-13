
package SparkExample
object entirety extends App {

  import org.apache.spark.mllib.linalg.Vectors
  import org.apache.spark.mllib.linalg.Vector
  import org.apache.spark.sql.SparkSession
  import org.apache.spark.SparkContext
  import org.apache.spark.sql.SparkSession
  import org.apache.spark.sql._
  import org.apache.spark._
  import org.apache.spark.sql.functions._
  import org.apache.spark.sql.types._
  import org.apache.spark.ml.feature.VectorAssembler
  import org.apache.spark.ml.clustering.BisectingKMeans




  //Creating A SparkSession
  val spark = SparkSession.builder()
    .master("local")
    .appName("my-spark-app")
    .getOrCreate()

  //val sqlcontext = spark.sql

  val customSchema = StructType(Array(
    StructField("c0", IntegerType, true),
    StructField("Sepal_Length", DoubleType, true),
    StructField("Sepal_Width", DoubleType, true),
    StructField("Petal_Length", DoubleType, true),
    StructField("Petal_Width", DoubleType, true),
    StructField("Species", StringType, true)))

  //val iris_df = sqlcontext.read
  //val iris_df = spark.read.format("csv").option("inferSchema", "true").option("header", "true") //reading the headers.option("mode", "DROPMALFORMED").load("/home/gchurch/Documents/Sample_Cluster_Data/iris.csv")
  val iris_df = spark.read
    .format("csv")
    .option("header", "true") //reading the headers
    .option("mode", "DROPMALFORMED")
    .schema(customSchema)
    .load("/home/gchurch/Documents/Sample_Cluster_Data/iris.csv")

  val assembler = new VectorAssembler().setInputCols(Array("Sepal_Length", "Sepal_Width", "Petal_Length", "Petal_Width"))
    .setOutputCol("features")

  val iris_df_trans = assembler.transform(iris_df)

  val bkm = new BisectingKMeans().setK(10)
    .setSeed(1L)
    .setFeaturesCol("features")

  val model = bkm.fit(iris_df_trans)

  val cost = model.computeCost(iris_df_trans)
  println(s"Within Set Sum of Squared Errors = $cost")

  println("Cluster Centers: ")
  val centers = model.clusterCenters
  centers.foreach(println)

  val outputJavaLinkage = model.toJavaLinkageMatrix.toArray

  val outputLinkage = model.toLinkageMatrix.toArray

  println("java linkage output below")
  println(outputJavaLinkage)
  outputJavaLinkage.foreach(x => println(x.toString))
  println("")
  println("standard linkage output below")
  println(outputLinkage)
  outputLinkage.foreach(x => println(x.toString))

  spark.stop()
}

