## Create invitation list for a survey wave

To create an invitation list for a survey wave with UID, you need to follow these steps:

1. Prepare all the master datasets and read them into R. The previous master datasets are named:
   - 2018.sav
   - 2019.sav
   - 2020-1.sav
   - 2020-2.sav
   - 2021.sav
   - 2023.sav

Please follow this naming convention. You need to edit the `generate-invite_list.R` script (line 5 and later) to point the correct path of these datasets. The datasets should be in the `data` folder.

2. Run `uid_2025.R`. It will generate and export a csv file with the following information.
   - UID: The unique identifier for each participant.
   - firstVersion: The first version of the survey that the participant joined.
   - lastVersion: The last version of the survey that the participant joined.
   - qualtricsID: The Qualtrics ID of the participant in the last survey.
   - willingness: The willingness of the participant to join the survey, stated in the last survey.
   - userLanguage: The survey language of the participant used in the last survey.
   - email: The email address of the participant, stated or used in the last survey.

Note that, if there are multiple survey responses in the last survey wave that the participant joined, the **first** response (based on the survey completion date) will be used to extract the information of qualtricsID, willingness, userLanguage, and email.

Also, if you need to assign a new UID to participants without it, please refer to the script line 128 and later and add your UID definition for the 2025 wave (or later) there.
