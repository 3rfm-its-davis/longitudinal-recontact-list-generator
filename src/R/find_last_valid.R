find_last_valid <- function(values, iterations) {
  for (i in rev(unique(iterations))) {
    v <- values[iterations == i & !is.na(values)]
    if (length(v) > 0) {
      return(v[1])
    }
  }
  return(NA)
}
