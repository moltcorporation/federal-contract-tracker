import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || id.length > 300) {
    return NextResponse.json({ error: "Invalid award ID" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.usaspending.gov/api/v2/awards/${encodeURIComponent(id)}/`,
      { headers: { "Content-Type": "application/json" } }
    );

    if (!res.ok) {
      const text = await res.text();
      if (text.includes("No Award found")) {
        return NextResponse.json({ error: "Award not found" }, { status: 404 });
      }
      return NextResponse.json(
        { error: `USASpending API returned ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      id: data.id,
      generatedUniqueAwardId: data.generated_unique_award_id,
      category: data.category,
      type: data.type,
      typeDescription: data.type_description,
      description: data.description,
      piid: data.piid,
      totalObligation: data.total_obligation,
      baseAndAllOptionsValue: data.base_and_all_options_value,
      baseExercisedOptionsVal: data.base_exercised_options_val,
      dateOfLastActionCurrentAward: data.date_of_last_action_current_award,
      periodOfPerformance: data.period_of_performance
        ? {
            startDate: data.period_of_performance.start_date,
            endDate: data.period_of_performance.end_date,
            lastModifiedDate: data.period_of_performance.last_modified_date,
            potentialEndDate: data.period_of_performance.potential_end_date,
          }
        : null,
      recipient: data.recipient
        ? {
            name: data.recipient.recipient_name,
            uei: data.recipient.recipient_uei,
            parentName: data.recipient.parent_recipient_name,
            parentUei: data.recipient.parent_recipient_uei,
            businessCategories: data.recipient.business_categories || [],
            location: data.recipient.location
              ? {
                  addressLine1: data.recipient.location.address_line1,
                  city: data.recipient.location.city_name,
                  state: data.recipient.location.state_code,
                  zip: data.recipient.location.zip5,
                  country: data.recipient.location.country_name,
                  congressionalDistrict:
                    data.recipient.location.congressional_code,
                }
              : null,
          }
        : null,
      placeOfPerformance: data.place_of_performance
        ? {
            city: data.place_of_performance.city_name,
            state: data.place_of_performance.state_code,
            zip: data.place_of_performance.zip5,
            country: data.place_of_performance.country_name,
            congressionalDistrict:
              data.place_of_performance.congressional_code,
          }
        : null,
      agency: data.awarding_agency
        ? {
            name: data.awarding_agency.toptier_agency?.name,
            subAgency: data.awarding_agency.subtier_agency?.name,
            officeName: data.awarding_agency.office_agency_name,
          }
        : null,
      fundingAgency: data.funding_agency
        ? {
            name: data.funding_agency.toptier_agency?.name,
            subAgency: data.funding_agency.subtier_agency?.name,
          }
        : null,
      naics: data.latest_transaction_contract_data?.naics,
      naicsDescription:
        data.latest_transaction_contract_data?.naics_description,
      psc: data.latest_transaction_contract_data?.product_or_service_code,
      pscDescription:
        data.latest_transaction_contract_data
          ?.product_or_service_code_description,
      contractType:
        data.latest_transaction_contract_data?.type_of_contract_pricing,
      contractTypeDescription:
        data.latest_transaction_contract_data
          ?.type_of_contract_pric_desc,
      setAsideType:
        data.latest_transaction_contract_data?.type_of_set_aside,
      setAsideDescription:
        data.latest_transaction_contract_data
          ?.type_of_set_aside_description,
      extentCompeted:
        data.latest_transaction_contract_data?.extent_competed,
      parentAward: data.parent_award
        ? {
            id: data.parent_award.agency_id,
            piid: data.parent_award.piid,
            awardId: data.parent_award.generated_unique_award_id,
          }
        : null,
      subawardCount: data.subaward_count ?? 0,
      totalSubawardAmount: data.total_subaward_amount ?? 0,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to connect to USASpending API" },
      { status: 502 }
    );
  }
}
