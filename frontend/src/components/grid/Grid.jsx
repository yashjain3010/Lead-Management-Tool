import "./Grid.css";
export default function Grid({ leadData }) {
  return (
    <div className="grid">
      <div className="card tall enC">
        <div className="entry">
          <div className="entryHeading">Contact Number</div>

          <div className="entryValue">{leadData.contactNumber}</div>
        </div>
        <div className="h-divider">
          <div className="shadow"></div>
        </div>
        <div className="entry">
          <div className="entryHeading">Email</div>
          <div className="entryValue">{leadData.email}</div>
        </div>
        <div className="h-divider">
          <div className="shadow"></div>
        </div>
        <div className="entry">
          <div className="entryHeading">Address</div>
          <div className="entryValue">{leadData.address}</div>
        </div>
      </div>
      <div className="card enC">
        <div className="entry">
          <div className="entryHeading">Lead Source</div>

          <div className="entryValue">{leadData.leadSource}</div>
        </div>
        <div className="h-divider">
          <div className="shadow"></div>
        </div>

        <div className="entry">
          <div className="entryHeading">Lead Notes</div>

          <div className="entryValue">{leadData.leadNotes}</div>
        </div>
      </div>

      <div className="card wide enC">
        <div className="entrySmall">
          <div className="entryHeadingSmall">Next FollowUp Date</div>

          <div className="entryValueSmall">{leadData.nextFollowUpDate}</div>
        </div>
        <div className="h-divider">
          <div className="shadow"></div>
        </div>
        <div className="entrySmall">
          <div className="entryHeadingSmall">Next FollowUp Time</div>
          <div className="entryValueSmall">{leadData.nextFollowUpTime}</div>
        </div>
        <div className="h-divider">
          <div className="shadow"></div>
        </div>
        <div className="entrySmall">
          <div className="entryHeadingSmall">Conversion Date</div>
          <div className="entryValueSmall">{leadData.conversionDate}</div>
        </div>
      </div>

      <div className="card enC">
        <div className="entry">
          <div className="entryHeading">Customer Type</div>

          <div className="entryValue"> {leadData.customerType}</div>
        </div>
        <div className="h-divider">
          <div className="shadow"></div>
        </div>

        <div className="entry">
          <div className="entryHeading">Assigned To</div>

          <div className="entryValue">{leadData.assignedTo}</div>
        </div>
      </div>

      <div className="card wide">
        <div className="entry">
          <div className="entryHeading">Purchase History</div>

          <div className="entryValue">{leadData.purchaseHistory}</div>
        </div>
        <div className="h-divider">
          <div className="shadow"></div>
        </div>

        <div className="entry">
          <div className="entryHeading">Medical Needs</div>

          <div className="entryValue">{leadData.medicalNeeds}</div>
        </div>
      </div>
    </div>
  );
}
