library(jsonlite)
library(haven)
library(tidyverse)

data_Y18 = read_csv(file.path("src", "R", "data", "2018.csv"))
data_Y19 = read_csv(file.path("src", "R", "data", "2019.csv"))
data_S20 = read_sav(file.path("src", "R", "data", "2020-1.sav"))
data_F20 = read_sav(file.path("src", "R", "data", "2020-2.sav"))
data_Y21 = read_sav(file.path("src", "R", "data", "2021.sav"))
data_Y23 = read_sav(file.path("src", "R", "data", "2023.sav"))

invite_list =
  read_json(
    file.path("src", "data", "output_list.json"),
  ) %>%
  imap_dfr(
    ~ {
      bind_rows(.x$surveysParticipated) %>%
        mutate(index = .y)
    }
  )

old_info = rbind(
  read_csv(
    file.path("src", "R", "data", "UID_lookup_table.csv")
  ) %>%
    rename(ResponseId = responseid, UID_OLD = UID) %>%
    right_join(
      read_csv(
        file.path("src", "R", "data", "UIDs_ca-panel-2018.csv")
      ) %>%
        select(UID, UID_OLD),
      by = "UID_OLD"
    ) %>%
    right_join(
      read_csv(
        file.path("src", "R", "data", "ResponseId-RecordedDate.csv")
      ),
      by = "ResponseId"
    ) %>%
    select(ResponseId, UID, UserLanguage, RecordedDate),
  data_Y19 %>%
    select(ResponseId, UID, UserLanguage, RecordedDate),
  data_S20 %>%
    select(ResponseId = meta_response_id, UID, UserLanguage = meta_user_language, RecordedDate = meta_recorded_date),
  data_F20 %>%
    select(ResponseId = meta_response_id, UID, UserLanguage = meta_user_language, RecordedDate = meta_recorded_date),
  data_Y21 %>%
    select(ResponseId = meta_response_id, UID, UserLanguage = meta_user_language, RecordedDate = meta_recorded_date),
  data_Y23 %>%
    select(ResponseId, UserLanguage, UID, RecordedDate = EndDate)
)

last_uid_18 = read_csv(
  file.path("src", "R", "data", "UIDs_ca-panel-2018.csv")
) %>%
  select(UID) %>%
  pull() %>%
  substring(5) %>%
  as.numeric() %>%
  max(na.rm = TRUE)

last_uid_19 = data_Y19 %>%
  select(UID) %>%
  pull() %>%
  substring(5) %>%
  as.numeric() %>%
  max(na.rm = TRUE)

last_uid_20_1 = data_S20 %>%
  select(UID) %>%
  pull() %>%
  substring(5) %>%
  as.numeric() %>%
  max(na.rm = TRUE)

last_uid_20_2 = data_F20 %>%
  select(UID) %>%
  pull() %>%
  substring(5) %>%
  as.numeric() %>%
  max(na.rm = TRUE)

last_uid_21 = data_Y21 %>%
  select(UID) %>%
  pull() %>%
  substring(5) %>%
  as.numeric() %>%
  max(na.rm = TRUE)

last_uid_23 = data_Y23 %>%
  select(UID) %>%
  pull() %>%
  substring(5) %>%
  as.numeric() %>%
  max(na.rm = TRUE)

id_list = tibble(
  lastQualtricsId = c(),
  email = c(),
  UID = c(),
  firstVersion = c(),
  lastVersion = c(),
  userLanguage = c(),
  willingness = c(),
)

id_list_c = tibble(
  lastQualtricsId = c(),
  email = c(),
  version = c(),
  willingness = c(),
)

source(file.path("src", "R", "find_last_valid.R"))

id_list = invite_list %>%
  left_join(
    old_info,
    by = c("qualtricsId" = "ResponseId")
  ) %>%
  group_by(index) %>%
  arrange(RecordedDate, .by_group = TRUE) %>%
  summarise(
    UID = first(UID[!is.na(UID)]),
    firstVersion = first(iteration),
    lastVersion = last(iteration),
    qualtricsId = find_last_valid(qualtricsId, iteration),
    willingness = find_last_valid(willingness, iteration),
    userLanguage = find_last_valid(UserLanguage, iteration),
    email = find_last_valid(email, iteration),
  ) %>%
  ungroup() %>%
  select(-index)

for (i in 1:dim(id_list)[1]) {
  if (i %% 100 == 0) {
    print(i)
  }

  id_list[i, "firstVersion"] = id_list[i, "firstVersion"] %>% as.character()

  if (is.na(id_list[i, "userLanguage"])) {
    id_list[i, "userLanguage"] = "EN_NA"
  }

  if (!is.na(id_list[i, "UID"])) {
    next
  }

  if (
    id_list[i, "firstVersion"] == "2018-l" ||
      id_list[i, "firstVersion"] == "2018-mo" ||
      id_list[i, "firstVersion"] == "2018-mm"
  ) {
    last_uid_18 = last_uid_18 + 1
    first_uid = paste0("18YO", sprintf("%06d", as.numeric(last_uid_18)))
  } else if (id_list[i, "firstVersion"] == "2019") {
    last_uid_19 = last_uid_19 + 1
    first_uid = paste0("19YO", sprintf("%06d", as.numeric(last_uid_19)))
  } else if (id_list[i, "firstVersion"] == "2020-1-l") {
    last_uid_20_1 = last_uid_20_1 + 1
    first_uid = paste0("20SL", sprintf("%06d", as.numeric(last_uid_20_1)))
  } else if (id_list[i, "firstVersion"] == "2020-1-o") {
    last_uid_20_1 = last_uid_20_1 + 1
    first_uid = paste0("20SO", sprintf("%06d", as.numeric(last_uid_20_1)))
  } else if (id_list[i, "firstVersion"] == "2020-1-c") {
    last_uid_20_1 = last_uid_20_1 + 1
    first_uid = paste0("20SC", sprintf("%06d", as.numeric(last_uid_20_1)))
  } else if (id_list[i, "firstVersion"] == "2020-2-l") {
    last_uid_20_2 = last_uid_20_2 + 1
    first_uid = paste0("20FL", sprintf("%06d", as.numeric(last_uid_20_2)))
  } else if (id_list[i, "firstVersion"] == "2020-2-o") {
    last_uid_20_2 = last_uid_20_2 + 1
    first_uid = paste0("20FO", sprintf("%06d", as.numeric(last_uid_20_2)))
  } else if (id_list[i, "firstVersion"] == "2020-2-c") {
    last_uid_20_2 = last_uid_20_2 + 1
    first_uid = paste0("20FC", sprintf("%06d", as.numeric(last_uid_20_2)))
  } else if (id_list[i, "firstVersion"] == "2021-l") {
    last_uid_21 = last_uid_21 + 1
    first_uid = paste0("21YL", sprintf("%06d", as.numeric(last_uid_21)))
  } else if (id_list[i, "firstVersion"] == "2021-o") {
    last_uid_21 = last_uid_21 + 1
    first_uid = paste0("21YO", sprintf("%06d", as.numeric(last_uid_21)))
  } else if (id_list[i, "firstVersion"] == "2021-c") {
    last_uid_21 = last_uid_21 + 1
    first_uid = paste0("21YC", sprintf("%06d", as.numeric(last_uid_21)))
  } else if (id_list[i, "firstVersion"] == "2021-mo") {
    last_uid_21 = last_uid_21 + 1
    first_uid = paste0("21YM", sprintf("%06d", as.numeric(last_uid_21)))
  } else if (id_list[i, "firstVersion"] == "2021-mm") {
    last_uid_21 = last_uid_21 + 1
    first_uid = paste0("21YP", sprintf("%06d", as.numeric(last_uid_21)))
  } else if (id_list[i, "firstVersion"] == "2023-l" || id_list[i, "firstVersion"] == "2023-li") {
    last_uid_23 = last_uid_23 + 1
    first_uid = paste0("23LX", sprintf("%06d", as.numeric(last_uid_23)))
  } else if (id_list[i, "firstVersion"] == "2023-ls") {
    last_uid_23 = last_uid_23 + 1
    first_uid = paste0("23LS", sprintf("%06d", as.numeric(last_uid_23)))
  } else if (id_list[i, "firstVersion"] == "2023-o150") {
    last_uid_23 = last_uid_23 + 1
    first_uid = paste0("23OM", sprintf("%06d", as.numeric(last_uid_23)))
  } else if (id_list[i, "firstVersion"] == "2023-c" || id_list[i, "firstVersion"] == "2023-ci") {
    last_uid_23 = last_uid_23 + 1
    first_uid = paste0("23CX", sprintf("%06d", as.numeric(last_uid_23)))
  } else if (id_list[i, "firstVersion"] == "2023-mo" || id_list[i, "firstVersion"] == "2023-moi") {
    last_uid_23 = last_uid_23 + 1
    first_uid = paste0("23MO", sprintf("%06d", as.numeric(last_uid_23)))
  } else if (id_list[i, "firstVersion"] == "2023-cb") {
    last_uid_23 = last_uid_23 + 1
    first_uid = paste0("23CB", sprintf("%06d", as.numeric(last_uid_23)))
  } else if (id_list[i, "firstVersion"] == "2023-mm") {
    last_uid_23 = last_uid_23 + 1
    first_uid = paste0("23MM", sprintf("%06d", as.numeric(last_uid_23)))
  }

  if (id_list[i, "firstVersion"] == "2021-mm") {
    id_list[i, "UID"] = first_uid
  } else {
    id_list[i, "UID"] = paste0(first_uid, "NA")
  }
}

write_csv(
  id_list,
  file.path("src", "data", "invite_list.csv")
)

write_csv(
  id_list %>%
    filter(willingness == "true"),
  file.path("src", "data", "invite_list_true.csv")
)
