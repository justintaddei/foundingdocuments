// Simple hack to get syntax highlighting my editor
const html = String.raw;

const template = document.createElement("template");

template.innerHTML = html`
  <aside>
    <ul>
      <li><a href="/preamble">Preamble</a></li>
      <li>
        <a href="/article/I">Article. I.</a>
        <ul>
          <a href="/article/I/1"><li>Section. 1.</li></a>
          <a href="/article/I/2"><li>Section. 2.</li></a>
          <a href="/article/I/3"><li>Section. 3.</li></a>
          <a href="/article/I/4"><li>Section. 4.</li></a>
          <a href="/article/I/5"><li>Section. 5.</li></a>
          <a href="/article/I/6"><li>Section. 6.</li></a>
          <a href="/article/I/7"><li>Section. 7.</li></a>
          <a href="/article/I/8"><li>Section. 8.</li></a>
          <a href="/article/I/9"><li>Section. 9.</li></a>
          <a href="/article/I/10"><li>Section. 10.</li></a>
        </ul>
      </li>
      <li>
        <a href="/article/II">Article. II.</a>
        <ul>
          <a href="/article/II/1"><li>Section. 1.</li></a>
          <a href="/article/II/2"><li>Section. 2.</li></a>
          <a href="/article/II/3"><li>Section. 3.</li></a>
          <a href="/article/II/4"><li>Section. 4.</li></a>
        </ul>
      </li>
      <li>
        <a href="/article/III">Article. III.</a>
        <ul>
          <a href="/article/III/1"><li>Section. 1.</li></a>
          <a href="/article/III/2"><li>Section. 2.</li></a>
          <a href="/article/III/3"><li>Section. 3.</li></a>
        </ul>
      </li>
      <li>
        <a href="/article/IV">Article. IV.</a>
        <ul>
          <a href="/article/IV/1"><li>Section. 1.</li></a>
          <a href="/article/IV/2"><li>Section. 2.</li></a>
          <a href="/article/IV/3"><li>Section. 3.</li></a>
          <a href="/article/IV/4"><li>Section. 4.</li></a>
        </ul>
      </li>
      <li><a href="/article/V/">Article. V.</a></li>
      <li><a href="/article/VI/">Article. VI.</a></li>
      <li><a href="/article/VII/">Article. VII.</a></li>
    </ul>
  </aside>
  <main>
    <header></header>
    <article>
      <h1>
        <span title="A short introduction to an official document.">Preamble</span>
      </h1>
      <p>
        We the People of the United States, in Order to form a more perfect
        <span title="A nation formed by the combining of two or more states that were previously separate and independent.">Union</span>,
        <span title="To set up; to make firm or permanent.">establish</span>
        <span title="The virtue or principle of treating everyone fairly.">Justice</span>,
        <span title="To make sure; to guard against loss or danger.">insure</span>
        <span title="Pertaining to the home or family; pertaining to one's own country and its internal affairs (such as between states or citizens); not foreign.">domestic</span>
        <span title="A condition of peace or calmness.">Tranquility</span>,
        <span title="To make plans, preparations, or arrangements for in advance.">provide for</span>
        the
        <span title="General; pertaining to the people at large; shared by all (in this case, all the states).">common</span>
        <span title="Means of protection against attack by foreign enemies.">defense</span>,
        <span title="To encourage, advance, or help move forward.">promote</span>
        the
        <span title="Common to all; pertaining to the whole body of citizens (in this case, the entire nation); not limited in application (such as to a single area, class, or person).">general</span>
        <span title="Happiness; prosperity; well-being.">Welfare</span>, and
        <span title="To safeguard or protect; to make certain.">secure</span>
        the Blessings of
        <span title="Freedom from unjust restraint or control; freedom to do as one chooses within the bounds of just laws.">Liberty</span>
        to ourselves and our
        <span title="Children; future generations.">Posterity</span>, do
        <span title="To appoint, decree, or enact; to set in order.">ordain</span>
        and establish this
        <span title="An established form of government; a system of basic rules and principles that determine how a state or nation is organized and governed. (A constitution is of higher authority than any law enacted by a legislature. In the United States, all laws, treaties, and court decisions must be in harmony with the Constitution, and all federal and state officials are required to support the Constitution. See II.1.8; VI.2-3.)">Constitution</span>
        for the United States of America.
      </p>
      <h1>
        <span title="A distinct part of an official document.">Article</span> I
        - The Legislative Branch
      </h1>
      <h2>
        <strong>Section 1</strong>
        - All law making power in 2 houses, Senate and House of Representatives
      </h2>
      <p>
        All
        <span title="Authority to enact laws. (In this case, federal laws.) ">legislative Powers</span>
        <span title="In this document. (That is, in this Constitution. See primarily I.8.)">herein</span>
        <span title="Given, allowed, or bestowed. (In this case, given by the people to the federal government.)">granted</span>
        shall be
        <span title="Placed in the possession or control of; legally given to.">vested in</span>
        a
        <span title="An assembly of delegates who meet to discuss and act on important matters concerning the people they represent (in this case, the citizens of the United States); the highest legislative body of a nation.">Congress</span>
        of the United States, which shall
        <span title="To be formed, made up, or composed of.">consist of</span> a
        <span title="The &quot;upper&quot; house or chamber of a legislative body, containing fewer members than the other house and sometimes regarded as more important. (Click to see Article I, Section 3.)">Senate</span>
        and
        <span title="The &quot;lower&quot; house of a legislative body. (Click to see Article I, Section 2)">House of Representatives</span>.
      </p>
      <h2><strong>Section 2</strong> - House of Representatives</h2>
      <section>
        <h3>Two-year terms; election of members.</h3><p>
    	 The House of Representatives shall
          <span title="To be formed or made up of; to consist of.">be composed of</span>
          Members chosen every second Year by the People of the several States,
          and the <span title="Qualified voters.">Electors</span> in each State
          shall have the
          <span title="Conditions that a person must meet before being considered fit or eligible for a certain privilege.">Qualifications </span><span title="(Pronounced REK-wuh-zit.) Necessary or essential.">requisite</span>
          for Electors of the
          <span title="The legislative chamber containing the largest number of members.">most numerous Branch</span>
          of the
          <span title="The lawmaking body of a state government.">State Legislature</span>.
    </p>
        
    <h3>Qualifications for House of Representatives</h3>
    <p>No Person shall be a
          <span title="A member of the U.S. House of Representatives, elected by the people of his or her state to represent them in making laws for the United States. (Also called a Congressman or Congresswoman.)">Representative</span>
          who shall not have
          <span title="Reached; achieved; arrived at.">attained to</span> the
          Age of twenty-five Years, and been seven Years a
          <span title="A person who owes allegiance to a government and is entitled to its protection. (See Amendment 14, section 1. In the United States, citizens have the privilege and duty of voting in public elections, serving on juries, and otherwise maintaining our system of free government.)">Citizen</span>
          of the United States, and who shall not, when elected, be an
          <span title="A person who lives permanently in a certain place.">Inhabitant</span>
          of that State in which he shall be chosen.</p>
   
        
    <h3>Representatives and taxes apportioned by population</h3>
<p>[Representatives
          and
          <span title="Taxes charged directly against individuals, their property, or their income (as opposed to indirect taxes, which are imposed on purchased goods rather than on people).">direct Taxes</span>
          shall be
          <span title="Divided, assigned, or distributed.">apportioned</span>
          among the several States which may be included within
          <span title="(That is, the United States.)">this Union</span>,
          according to
          <span title="(That is, the populations of the individual states.)">their respective Numbers</span>, which shall be
          <span title="Decided, found out, or settled.">determined</span> by
          adding to the whole Number of free Persons, including
          <span title="Free persons who bind or obligate themselves by contract to work for someone else for a certain period of time, usually in return for housing, food, and payment of other expenses. (Sometimes called indentured servants.)">those bound to Service for a Term of Years</span>, and
          <span title="Not including; with the exception of.">excluding</span>
          Indians not
          <span title="Charged or required to pay taxes.">taxed</span>, three
          fifths of all
          <span title="(That is, slaves.)">other Persons</span>.]<sup><a title="[The words in brackets have been superseded by Amendment 14, section 2.] Click to see Amendment 14." href="/amendment/14/2">amd</a></sup>
          The actual
          <span title="A counting or numbering. (In this case, a census, or a count of the population.)">Enumeration</span>
          shall be made within three Years after the first Meeting of the
          Congress of the United States, and within every
          <span title="A period of time afterward. (In this case, after the first census is taken.)">subsequent Term</span>
          of ten Years, in such
          <span title="Form; method; way.">Manner</span> as
          <span title="(That is, the Congress.)">they</span> shall by Law
          direct. The number of Representatives shall not
          <span title="To surpass or go beyond; to be greater than.">exceed</span>
          one for every thirty Thousand, but each State shall have at Least one
          Representative; [and until such enumeration shall be made, the state
          of New Hampshire shall
          <span title="To have a right or claim.">be entitled</span> to chuse
          three, Massachusetts eight,
          <span title="The official name of the state of Rhode Island, from the uniting of two early settlements on Aquidneck (later Rhode) Island with two others on the mainland. (One of the mainland settlements, Providence, is now the state capital.)">Rhode Island and Providence Plantations</span>
          one, Connecticut five, New York six, New Jersey four, Pennsylvania
          eight, Delaware one, Maryland six, Virginia ten, North Carolina five,
          South Carolina five, and Georgia three]<sup><span title="[The words in brackets have been obsolete since 1793.]">amd</span></sup>.</p>
      
        <h3>Filling vacancies</h3>
<p>When <span title="Instances of a public office being left vacant or unoccupied (due to death, resignation, etc.).">vacancies</span>
          happen in the R<span title="The elected officials representing the voters, spoken of as a group.">epresentation</span>
          from any State, the
          <span title="The officer who executes or carries into effect the laws of a particular government. (In this case, the governor.)">Executive Authority</span>
          <span title="Of the thing previously mentioned. (That is, of ">thereof</span>
          shall
          <span title="To send out, put forth, or distribute.">issue</span>
          <span title="Official documents ordering that elections be held (usually in cases of an unexpected vacancy in a public office).">Writs of Election</span>
          to fill such Vacancies.</p>
        <h3> Officers; power of impeachment</h3>
<p>The House of Representatives shall
          chuse their
          <span title="The presiding officer in some lawmaking bodies.">Speaker</span>
          and other Officers; and shall have the
          <span title="Independent; acting without assistance or interference from others.">sole</span>
          Power of
          <span title="A formal charge or accusation of misconduct in public office. 
           (In the national government, such a charge may be made against an officer of the executive or judicial branch. See I.3.6-7; II.4.)">Impeachment</span>.</p>
      </section>
      <h2>
        <strong>Section 3</strong>
        - Senate<br>
      </h2>
      <section>
        
    <h3>Senate membership, terms of office</h3>
    <p>
    	The Senate of the United
          States shall
          <span title="To be formed or made up of; to consist of.">be composed of</span>
          two Senators from each State, [chosen by the
          <span title="An organized body of people having authority to make laws.">Legislature</span>
          <span title="Of the thing or things previously mentioned. (That is, of ">thereof,]</span><a title="Changed by the 17th amendment.  (Click to go to the 17th amendment.)" href="/amendment/17"><sup>amd</sup></a>
          for six Years; and each Senator shall have one Vote.
    </p>
        <h3>1/3 elected every 2 years; Filling Vacancies</h3>
          
<p> Immediately after
          <span title="(That is, the Senate.)">they</span> shall be
          <span title="Convened; gathered together in a meeting.">assembled</span>
          <span title="As a result of.">in Consequence of</span> the first
          Election, they shall be divided as equally as may be into three
          <span title="Groups, categories, or divisions.">Classes</span>. The
          Seats of the Senators of the first Class shall be
          <span title="Given up; made vacant or unoccupied.">vacated</span> at
          the <span title="End; termination.">Expiration</span> of the second
          Year, of the second Class at the Expiration of the fourth Year, and of
          the third Class at the Expiration of the sixth Year, so that one third
          may be chosen every second Year; [and if
          <span title="Instances of a public office being left vacant or unoccupied (due to death, resignation, etc.).">Vacancies</span>
          happen by
          <span title="The act of quitting or voluntarily giving up a position.">Resignation</span>, or
          <span title="In a different way; by other means.">otherwise</span>,
          during the
          <span title="A temporary stop in business, often for rest or relaxation.">Recess</span>
          of the Legislature of any State, the
          <span title="The officer who executes or carries into effect the laws of a particular government. (In this case, the governor.)">Executive</span>
          <span title="Of the thing previously mentioned. (That is, of &quot;any state.&quot;)">thereof</span>
          may make <span title="Lasting for a limited time.">temporary</span>
          <span title="Official acts of naming or appointing persons to public office.">Appointments</span>
          until the next Meeting of the Legislature, which shall then fill such
          Vacancies]<sup><a title="[The words in brackets have been superseded by Amendment 17, paragraph 2.] Click to see Amendment 17." href="/amendment/17">amd</a>.</sup>
  </p>
        
          <h3>Qualifications</h3>
    <p>No Person shall be a
          <span title="A member of the U.S. Senate, elected by the people of his or her state to represent them in making laws for the United States. (Until 1913, Senators were appointed by the state legislatures to represent the state governments. See I.3.1; Amendment 17.)">Senator</span>
          who shall not have
          <span title="Reached; achieved; arrived at.">attained to</span> the
          Age of thirty Years, and been nine Years a
          <span title="A person who owes allegiance to a government and is entitled to its protection. (Click to see Amendment 14, section 1.)">Citizen</span>
          of the United States, and who shall not, when elected, be an
          <span title="A person who lives permanently in a certain place.">Inhabitant</span>
          of that State for which he shall be chosen.</p>
        <h3>President of the Senate</h3>
<p>
The Vice President of the United States
          shall be President of the Senate, but shall have no Vote, unless
          <span title="(That is, the Senate.)">they</span> be
          <span title="Tied; having an equal number of votes on both sides of an issue.">equally divided</span>.
        </p>
        
    <h3>Other officers</h3>

<p>
The Senate shall chuse their other Officers, and
          also a President
          <span title="(Pronounced pro TEM-puh-ree. From Latin; ">pro tempore,</span>
          in the Absence of the Vice President, or when
          <span title="(That is, the Vice President.)">he</span> shall
          <span title="To carry out; to perform the duties of.">exercise</span>
          the Office of President of the United States.
</p>
        
    <h3> Trials of impeachment</h3>
<p>The Senate shall have the
          <span title="Independent; acting without assistance or interference from others.">sole</span>
          Power to
          <span title="To examine or investigate as a judge; to conduct a trial of.">try</span>
          all
          <span title="Formal charges or accusations of misconduct in public office. 
           (In the national government, such charges may be made against an officer of the executive or judicial branch. See I.2.5; II.4.)">Impeachments</span>. When <span title="Assembled; in session.">sitting</span> for that
          Purpose, they shall be on O<span title="A solemn declaration by an individual (such as in a court of law) that involves calling upon God to witness the truth of what one says.">ath</span>
          or
          <span title="A solemn declaration that may be made in place of an oath and often results in legal penalties if the statement is found to be false.">Affirmation</span>. When the President of the United States is tried, the
          <span title="The highest judge in the United States; the presiding officer of the U.S. Supreme Court. (Click to see III.1.)">Chief Justice</span>
          shall
          <span title="To act as president or chairman; to direct, control, or govern.">preside:</span>
          And no Person shall be
          <span title="Proven or found guilty of some crime or misconduct.">convicted</span>
          without the
          <span title="Agreement, consent, or unity of opinion.">Concurrence</span>
          of two thirds of the Members
          <span title="In attendance at the time.">present</span>.</p>
        <h3>Penalty of impeachment convictions</h3>
<p>

<span title="The sentence or penalty pronounced by a judge or court of law.">Judgment</span>
          in
          <span title="Lawsuits, accusations, or legal questions brought before a judge or court of law for decision. (In this case, before the U.S. Senate.)">Cases</span>
          of Impeachment shall not
          <span title="To stretch out or reach; to apply.">extend</span> further
          than to
          <span title="The act of removing, dismissing, or taking away (someone).">removal</span>
          from
          <span title="A position of responsibility or authority in government.">Office</span>, and
          <span title="The act of declaring someone to be unfit or ineligible.">disqualification</span>
          to hold and enjoy any Office of
          <span title="Rank, distinction, or recognition.">honor</span>, Trust
          or
          <span title="Gain, benefit, or financial reward.">Profit</span> under
          the United States: but the
          <span title="A person or group taking one side in a dispute.">Party</span>
          convicted shall
          <span title="Notwithstanding; in spite of what was previously stated.">nevertheless</span>
          be
          <span title="Legally bound or responsible; exposed or subject to some unfavorable event.">liable</span>
          and
          <span title="Under the authority or control of.">subject to</span>
          <span title="(Pronounced in-DITE-munt.) A formal, written charge of criminal misconduct presented to a court of law, usually by a grand jury. (A grand jury is a body of twelve to twenty-three citizens appointed to examine criminal accusations to decide whether there is enough evidence to require a public trial.)">Indictment</span>, Trial, Judgment, and Punishment, according to Law.
        
</p>
      </section>
      <h2>
        <strong>Section 4</strong>
        - Elections and meetings for both houses
      </h2>
      <section>
        
    <h3>Regulation of elections</h3>
<p>
The Times, Places and M<span title="Form; method; way.">anner</span>
          of holding Elections for
          <span title="Members of the U.S. Senate, elected by the people to represent them in making laws for the United States. (Until 1913, Senators were appointed by the state legislatures to represent the state governments. See Article I Section 3 Clause 1; Amendment 17.)">Senators</span>
          and
          <span title="Members of the U.S. House of Representatives, elected by the people to represent them in making laws for the United States. (Also called Congressmen or Congresswomen. See Article I Section 2.)">Representatives</span>
          shall be
          <span title="Ordered, directed, or laid down as a rule.">prescribed</span>
          in each State by the
          <span title="An organized body of people having authority to make laws.">Legislature </span><span title="Of the thing previously mentioned. (That is, of ">thereof</span>; but the Congress may at any time by Law make or
          <span title="To change or make different.">alter</span> such
          <span title="Rules or orders having the force of law.">Regulations</span>, except as to the places of chusing Senators.
</p>
        
<h3>Congress to meet annually</h3>
<p>
The Congress shall
          <span title="To meet or come together; to convene.">assemble</span> at
          least once in every Year, and such Meeting shall be [on the first
          Monday in December,]<sup><a title="[The words in brackets have been superseded by Amendment 20, section 2.] Click to see Amendment 20." href="/amendment/20/2">amd</a></sup>
          unless <span title="(That is, the Congress.)">they</span> shall by Law
          appoint a different Day.
</p>
       
      </section>
      <h2>
        <strong>Section 5</strong>
        - Rules for Each House
      </h2>
      <section>
        
    <h3>Organization and independence of each house of Congress</h3>
<p>Each
          <span title="A chamber or division of Congress. (That is, either the Senate or the House of Representatives.)">House</span>
          shall be the Judge of the Elections,
          <span title="A report or official declaration of the results of an election.">Returns</span>
          and
          <span title="Conditions that a person must meet before being considered fit or eligible for a certain privilege.">Qualifications</span>
          of its own Members, and a
          <span title="A number greater than half of the total.">Majority</span>
          of <span title="(That is, each house of Congress.)">each</span> shall
          <span title="To form, compose, or make up.">constitute</span> a
          <span title="The number of members of an organized body sufficient to conduct business (usually a majority).">Quorum</span>
          to do business; but a smaller Number may
          <span title="To close a meeting or session of a public body, usually until some later time.">adjourn</span>
          from day to day, and may be
          <span title="Given legal power or authority; empowered.">authorized</span>
          to <span title="To force; to require.">compel</span> the Attendance of
          absent Members, in such
          <span title="Form; method; way.">Manner,</span> and under such
          Penalties as each House may
          <span title="To agree upon; to arrange for; to establish or require.">provide</span>.</p>
        
<h3>Rules of proceedings</h3>
<p>Each House may
          <span title="To decide or settle.">determine</span> the Rules of its
          <span title="A course of events or transactions.">Proceedings</span>,
          punish its Members for
          <span title="Conduct that violates law or established rules of order.">disorderly Behaviour</span>, and, with the
          <span title="Agreement, consent, or unity of opinion.">Concurrence</span>
          of two thirds,
          <span title="To drive out; to command or force to leave.">expel</span>
          a Member.
      </p>
        
    <h3>Journals of each house</h3>
    <p>Each House shall keep a
          <span title="A record of daily events or transactions.">Journal</span>
          of its Proceedings, and from time to time
          <span title="To announce or make known to the public; to put in print for public distribution.">publish</span>
          <span title="The same thing previously mentioned. (That is, ">the same</span>,
          <span title="Except; excluding; taking or leaving out.">excepting</span>
          such Parts as may in their Judgment require Secrecy; and the
          <span title="Affirmative (">Yeas and Nays</span> of the Members of
          either House on any
          <span title="A matter being decided by vote.">question</span> shall,
          at the Desire of one fifth of those
          <span title="In attendance at the time.">Present</span>, be
          <span title="Included or written in.">entered on</span> the Journal.</p>

        
    <h3>Restrictions on Adjournment</h3>
<p>Neither House, during the
          <span title="The period of time during which a legislature or other public body meets to conduct official business.">Session</span>
          of Congress, shall, without the
          <span title="Approval or agreement.">Consent</span> of the other,
          adjourn for more than three days, nor to any other Place than that in
          which the two Houses shall be
          <span title="Holding a session for official business.">sitting</span>.</p>

      </section>
      <h2>
        <strong>Section 6</strong>
        - Privileges and Restrictions
      </h2>
      <section>
        
    <h3>Pay and Privileges</h3>
<p>The
          <span title="Members of the U.S. Senate, elected by the people to represent them in making laws for the United States. (Until 1913, Senators were appointed by the state legislatures to represent the state governments. See I.3.1; Amendment 17.)">Senators</span>
          and
          <span title="Members of the U.S. House of Representatives, elected by 
           the people to represent them in making laws for the United States. (Also called Congressmen or Congresswomen. See I.2.)">Representatives</span>
          shall receive a <span title="Payment.">Compensation</span> for their
          Services, to be
          <span title="Defined; made sure.">ascertained</span> by Law, and paid
          out of the
          <span title="A place where public funds are deposited, kept, and paid out.">Treasury</span>
          of the United States. They shall in all Cases, except
          <span title="The crime of betraying one's own country by trying to overthrow its government or by giving help to its enemies. (See III.3.1.)">Treason</span>,
          <span title="A very serious crime (such as murder, rape, or robbery), often punished by imprisonment, by the loss of civil rights (such as the right to vote or hold public office), or even by death.">Felony</span>
          and
          <span title="A violation of the public peace by fighting, rioting, or some other illegal disturbance.">Breach of the Peace</span>, be
          <span title="Protected; exempt; not subject to the usual rules or penalties.">privileged</span>
          from
          <span title="The act of being taken or held by officers of the law.">Arrest</span>
          during their Attendance at the
          <span title="The period of time during which a legislature or other public body meets to conduct official business.">Session</span>
          of their <span title="Individual; separate.">respective</span>
          <span title="Chambers or divisions of Congress. (That is, the Senate and the House of Representatives.)">Houses</span>, and in going to and returning from
          <span title="The same thing or things previously mentioned. (That is, &quot;their respective houses.&quot;)">the same</span>; and for any Speech or
          <span title="An argument; a formal discussion on opposing sides of a question.">Debate</span>
          in either House, they shall not be
          <span title="Examined by questions; legally challenged.">questioned</span>
          in any other Place.</p>
    
        
    <h3>Prohibitions</h3>
<p>No Senator or Representative shall, during the Time
          for which he was elected, be appointed to any
          <span title="A nonmilitary position of responsibility or authority in government.">civil Office</span>
          under the Authority of the United States, which shall have been
          created, or the
          <span title="Wages, salary, or income resulting from employment.">Emoluments</span>
          <span title="Of which.">whereof</span> shall have been increased
          during such time; and no person holding any Office under the United
          States, shall be a Member of either House during his
          <span title="The time during which something lasts or continues.">Continuance</span>
          in Office.</p>
      </section>
      <h2><strong>Section 7</strong> - The Lawmaking Process</h2>
      <section>
        
    <h3>Revenue bills to originate in House</h3>
<p>All
          <span title="Proposed laws presented to a legislature for their vote.">Bills</span>
          for <span title="Collecting or obtaining.">raising</span>
          <span title="Tax money and other income that a government collects and receives into the treasury for public use.">Revenue</span>
          shall
          <span title="To begin; to come into existence.">originate</span> in
          the House of Representatives; but the Senate may
          <span title="To recommend or suggest.">propose</span> or
          <span title="To agree.">concur</span> with
          <span title="Additions, corrections, or other changes in wording.">Amendments</span>
          as on other Bills.</p>

        
    <h3>How bills become law</h3>
<p>Every Bill which shall have
          <span title="To have been approved or enacted by vote.">passed</span>
          the House of Representatives and the Senate, shall, before it become a
          Law, be presented to the President of the United States; If he approve
          he shall sign it, but if not he shall return it, with his
          <span title="Reasons or arguments given in opposition.">Objections</span>
          to that
          <span title="A chamber or division of Congress. (That is, the Senate or the House of Representatives.)">House</span>
          in which it shall have originated, who shall
          <span title="To include or write in.">enter</span> the Objections
          <span title="In full; completely.">at large</span> on their
          <span title="A record of daily events or transactions.">Journal</span>
          and
          <span title="To go forward; to begin and carry on an action.">proceed</span>
          to <span title="To examine or evaluate again.">reconsider</span> it.
          If after such Reconsideration two thirds of that House shall agree to
          pass the Bill, it shall be sent, together with the Objections, to the
          other House, by which it shall
          <span title="In the same way; also.">likewise</span> be reconsidered,
          and if approved by two thirds of that house, it shall become a Law.
          But in all such
          <span title="Events; situations; circumstances.">Cases</span> the
          Votes of both Houses shall be
          <span title="Decided or settled.">determined</span> by
          <span title="Affirmative (">yeas and Nays</span>, and the Names of the
          Persons voting for and against the Bill shall be entered on the
          Journal of each House
          <span title="Individually; separately.">respectively</span>. If any
          Bill shall not be returned by the President within ten days (Sundays
          <span title="Not included.">excepted</span>) after it shall have been
          presented to him, the Same shall be a Law,
          <span title="In the same way">in like Manner</span> as if he had
          signed it, unless the Congress by their
          <span title="The closing of the session of a public body.">Adjournment</span>
          <span title="To hinder or stop; to keep from happening.">prevent</span>
          its Return, in which Case it shall not be a Law.</p>
    
        
    <h3>How orders, resolutions become law</h3>
<p>Every
          <span title="A rule, regulation, or command.">Order</span>,
          <span title="An official decision; a formal expression of opinion.">Resolution</span>, or Vote to which the Concurrence of the Senate and House of
          Representatives may be necessary (except on a question of Adjournment)
          shall be presented to the President of the United States; and, before
          <span title="The same thing previously mentioned. (That is, the &quot;order, resolution, or vote.&quot;)">the Same</span>
          shall take Effect, shall be approved by him, or being disapproved by
          him, shall be
          <span title="Approved or enacted again by the vote of a legislature.">repassed</span>
          by two thirds of the Senate and House of Representatives, according to
          the Rules and Limitations
          <span title="Ordered, directed, or laid down as a rule. (See I.7.2.)">prescribed</span>
          in the case of a Bill.</p>
      </section>
      <h2>
        <strong>Section 8</strong>
        - Powers of Congress
      </h2>
      
      <section>
        <p>The Congress shall have Power</p><h3>Collect taxes to pay debts and provide for common defense and general
          welfare</h3>
          
<p>To
          <span title="To charge or impose as a duty or burden.">lay</span> and
          collect
          <span title="Sums of money charged and collected by a government for public use.">Taxes</span>,
          <span title="Taxes to be paid on imports, exports, or purchased goods.">Duties</span>,
          <span title="Taxes or duties, especially those to be paid on imported goods.">Imposts</span>
          and
          <span title="Taxes on the production or sale of goods, levied within a country rather than on articles imported from other lands.">Excises</span>, to pay the
          <span title="Amounts of money owed to others.">Debts</span> and
          <span title="To make plans, preparations, or arrangements for in advance.">provide for</span>
          the
          <span title="General; pertaining to the people at large; shared by all (in this case, all the states).">common</span>
          <span title="Means of protection against attack by foreign enemies.">Defense</span>
          and
          <span title="Common to all; pertaining to the whole body of citizens (in this case, the entire nation); not limited in application (such as to a single area, class, or person).">general</span>
          <span title="Happiness; prosperity; well-being.">Welfare</span> of the
          United States; but all Duties, Imposts, and Excises shall be
          <span title="Not varying; the same; consistent.">uniform</span>
          throughout the United States;</p>
        
          <h3>Borrow money on credit of U.S.</h3>
<p>To borrow Money on the
          <span title="The trust or confidence placed in the ability of a person, organization, or country to pay its debts; financial trustworthiness.">credit</span>
          of the United States;</p>
        
    <h3>Regulate Commerce</h3>
<p>To
          <span title="To adjust or direct by means of rules and regulations; to put in good order.">regulate</span>
          <span title="Trading or buying and selling of goods.">Commerce</span>
          with
          <span title="Outside one's own country. (In this case, outside the United States.)">foreign</span>
          Nations, and among the several States, and with the Indian
          <span title="Nations or large groups of families, often descended from the same ancestors.">Tribes</span>;</p>
        
    <h3>Establish naturalization and bankruptcy laws</h3>
    <p>To establish an
          uniform Rule of Naturalization, and uniform Laws on the subject of
          Bankruptcies throughout the United States;</p>
        <h3>Coin money, regulate value, fix weights and Measures</h3>
<p> To coin
          <span title="Metal stamped into coins for use in commerce. (More recently, something used as a substitute for coins and generally accepted as a means of payment, such as bank notes or bills of credit.)">Money</span>, regulate the Value
          <span title="Of the thing previously mentioned. (That is, of ">thereof</span>, and of foreign Coin, and
          <span title="To set or establish; to make firm or permanent.">fix</span>
          the S<span title="The rule or measure by which other things are to be adjusted.">tandard</span>
          of Weights and Measures;
  </p>
        
    <h3>Punish for Counterfeiting</h3>
<p>To provide for the Punishment of
          <span title="Making a false copy of something valuable (such as money) for the purpose of cheating or stealing.">counterfeiting</span>
          the
          <span title="Printed notes, bonds, certificates, etc., that guarantee the payment of certain amounts of money to the persons who hold them.">Securities</span>
          and
          <span title="Units of money presently accepted by law.">current Coin</span>
          of the United States;</p>
        
        <h3>Establish Post Roads</h3><p>To establish Post Offices and
          <span title="Roads or highways on which mail is transported.">post Roads</span>;</p>
        
<h3>Establish Copyright and Patent laws</h3><p>To
          <span title="To encourage, advance, or help move forward.">promote</span>
          the Progress of
          <span title="Knowledge in general; understanding or mastery of any field of knowledge, gained through study of the facts, theories, or principles pertaining to that subject. (Science is often viewed as being different from art, which is skill in performing certain actions and is developed through practice. Thus the theory of music is a science, while the performance of it is an art.)">Science</span>
          and
          <span title="Skills, occupations, or fields of learning that mainly involve the use of the hands and the body, such as carpentry or sewing. (Also called industrial arts, mechanical arts, or trades. The useful arts are viewed as being different from the fine arts, such as poetry, music, and painting, which mainly involve the mind or imagination.)">useful Arts,</span>
          by
          <span title="Safeguarding or protecting; making certain.">securing</span>
          for limited Times to Authors and Inventors the
          <span title="The right to be the only one who may control something. (In this case, the reproduction, sale, or distribution of certain writings or discoveries.)">exclusive Right</span>
          to their
          <span title="Individual; separate.">respective</span> Writings and
          Discoveries;</p>
        <h3>Establish Inferior Courts</h3><p>To
          <span title="To set up, appoint, or establish.">constitute</span>
          <span title="Courts of justice. (See III.1.)">Tribunals</span>
          <span title="Of a lower rank than.">inferior to</span> the
          <span title="The highest court of justice in the United States. (See III.1.)">supreme Court</span>;</p>
        <h3>Define and Punish Felonies and Offenses</h3><p>To
          <span title="To determine or explain the meaning or limits of.">define</span>
          and punish
          <span title="Robberies committed at sea.">Piracies</span> and
          <span title="Very serious crimes (such as murders, rapes, and robberies), often punished by imprisonment, by the loss of civil rights (such as the right to vote or hold public office), or even by death.">Felonies</span>
          committed on the high Seas, and
          <span title="Violations of law; crimes.">Offenses</span> against the
          <span title="A system of agreed-upon rules and customs governing the relations between civilized countries.">Law of Nations</span>;</p>
        
<h3>Declare War</h3><p>To
          <span title="To formally or publicly announce.">declare</span>
          War,
          <span title="To give, allow, or bestow.">grant</span>
          <span title="(Pronounced mark and rih-PRIZE-ul.) Government-issued licenses authorizing owners of private ships to capture enemy vessels or seize their goods during wartime. (Marque and reprisal have almost the same meaning, which is the use of force to retaliate for damage or loss caused by someone else.)">Letters of Marque and Reprisal</span>, and make Rules concerning
          <span title="Soldiers, ships, weapons, supplies, or other property captured in war.">Captures</span>
          on Land and Water;</p>
        
<h3>Raise and support Armies</h3><p>To
          <span title="To make or form; to collect; to enlist.">raise</span> and
          <span title="To pay the costs of; to maintain.">support</span> Armies,
          but no
          <span title="The act of assigning (something) to a particular use.">Appropriation</span>
          of Money to that Use shall be for a longer
          <span title="A period of time.">Term</span> than two Years;</p>
        
<h3>Provide and maintain a Navy</h3><p>To
          <span title="To supply or make available; to establish or arrange for.">provide</span>
          and <span title="To pay the costs of; to support.">maintain</span> a
          Navy;</p>
        
<h3>Raise and support a Navy</h3><p>To make Rules for the
          <span title="The process of governing, directing, or controlling.">Government</span>
          and
          <span title="The process of putting (something) in good order by means of established rules.">Regulation</span>
          of the
          <span title="The armed forces on land and sea (such as the army, navy, etc.).">land and naval Forces</span>;</p>
        
<h3>Call forth the Militia</h3><p>To
          <span title="To make plans, preparations, or arrangements for in advance.">provide for</span>
          <span title="Bringing or summoning to action.">calling forth</span>
          the
          <span title="A nation's able-bodied men who are not enlisted in the regular armed forces but may be called into military service in an emergency.">Militia</span>
          to <span title="To carry into effect.">execute</span> the Laws of the
          <span title="(That is, the United States.)">Union</span>,
          <span title="To overpower, put down, or subdue.">suppress</span>
          <span title="Instances of a group of citizens openly rising up against their government.">Insurrections</span>, and <span title="To drive back by force.">repel</span>
          <span title="Attacks by an enemy; instances of a hostile army entering a country to plunder or conquer it.">Invasions</span>;</p>
        <h3>Organizing, Arming and Disciplining the Militia</h3><p>To provide for
          organizing,
          <span title="Furnishing or equipping with military weapons.">arming</span>, and
          <span title="Bringing under control; subjecting to military regulations.">disciplining</span>
          the Militia, and for governing such Part of them as may be
          <span title="Used; occupied; engaged.">employed</span> in the Service
          of the United States,
          <span title="Retaining; keeping back; setting aside.">reserving</span>
          to the States
          <span title="Individually; separately.">respectively,</span> the
          Appointment of the Officers, and the Authority of training the Militia
          according to the discipline
          <span title="Ordered, directed, or laid down as a rule.">prescribed</span>
          by Congress;</p>
        
<h3>Make exclusive legislation over Government Owned Property</h3><p>To
          <span title="To use; to engage in; to perform the duties of.">exercise</span>
          <span title="The power to be the only lawmaking body. (In this case, to the exclusion of the state legislatures.)">exclusive Legislation</span>, in all
          <span title="Events; situations; circumstances.">Cases</span>
          <span title="Whatever; of any kind at all.">whatsoever</span>, over
          such
          <span title="A particular area or region. (In this case, the District of Columbia.)">district</span>
          (not
          <span title="Surpassing or going beyond; being greater than.">exceeding</span>
          ten miles square) as may, by
          <span title="The act of surrendering or giving away something.">Cession</span>
          of <span title="Single; individual.">particular</span> States, and the
          Acceptance of Congress, become the
          <span title="The place from which governmental authority is exercised (such as a capital city).">Seat of the Government</span>
          of the United States, and to exercise
          <span title="The same or nearly the same. (As used here, ">like</span>
          Authority over all Places
          <span title="Bought or legally obtained. (In this case, bought from the states by the federal government.)">purchased</span>
          by the <span title="Approval or agreement.">Consent</span> of the
          <span title="An organized body of people having authority to make laws.">Legislature</span>
          of the State in which
          <span title="The same thing or things previously mentioned. (That is, ">the Same</span>
          shall be, for the
          <span title="Construction or building.">Erection</span> of Forts,
          <span title="Storehouses for military weapons, ammunition, and supplies.">Magazines, Arsenals</span>,
          <span title="Yards or enclosures near harbors for the storage of naval materials and the construction or repair of ships.">dock-Yards</span>, and other needful Buildings;-And</p>
        <h3>Make laws for carrying out foregoing powers</h3><p>To make all Laws
          which shall be
          <span title="Required; essential; unavoidable.">necessary</span> and
          <span title="Fitting; suitable; appropriate.">proper</span> for
          carrying into Execution the
          <span title="Preceding; listed or mentioned before. (That is, in I.8.1-17.)">foregoing</span>
          Powers, and all other Powers
          <span title="Placed in the possession or control of; legally given to.">vested</span>
          by this Constitution in the government of the United States, or in any
          Department or Officer
          <span title="Of the thing previously mentioned. (That is, of ">thereof</span>.</p>
      </section>
      
        <h2>
          <strong>Section 9</strong>
          - Powers forbidden to Congress
        </h2>
        <section>
          <h3>Slavery not Prohibited before 1808</h3>
<p>
The
            <span title="The act of moving from one country or place to another.">Migration</span>
            or
            <span title="The act of importing or bringing in (something or someone) from a foreign country.">Importation</span>
            of <span title="(That is, slaves.)">such Persons as</span> any of
            the States now existing shall think proper to
            <span title="To allow to enter.">admit,</span> shall not be
            <span title="Forbidden; made unlawful; ruled out.">prohibited</span>
            by the Congress <span title="Before.">prior to</span> the Year one
            thousand eight hundred and eight, but a Tax or
            <span title="A tax to be paid on imports, exports, or purchased goods.">duty</span>
            may be
            <span title="Laid on or charged as a burden or penalty.">imposed</span>
            on such Importation, not
            <span title="Surpassing or going beyond; being greater than.">exceeding</span>
            ten dollars for each Person.
</p>
          <h3>Writ of Habeas Corpus</h3><p>
The
            <span title="A right or protection granted or secured by law.">Privilege</span>
            of the
            <span title="(Pronounced HAY-bee-us KOR-pus. A legal order that states that a person in prison must appear before and be judged by a court of law before he or she can be forced by law to stay in prison">Writ of Habeas Corpus</span>
            shall not be
            <span title="Temporarily stopped or set aside.">suspended</span>,
            unless when in
            <span title="Events; situations; circumstances.">Cases</span> of
            <span title="Open, armed resistance or revolt against the government.">Rebellion</span>
            or
            <span title="An attack by an enemy; an instance of a hostile army entering a country to plunder or conquer it.">Invasion</span>
            the
            <span title="Pertaining to the government or the people at large.">public</span>
            Safety may require it.
</p>
          <h3>No Bill of Attainder or Ex Post Facto Law</h3><p>No
            <span title="A law that accuses a person of a serious crime and imposes a penalty on him (usually death) without the benefit of a court trial.">Bill of Attainder</span>
            or <span title="">ex post facto Law</span> shall be
            <span title="Approved or enacted by vote. (In this case, a vote of Congress.)">passed</span>.</p>
          
        <h3>
            Direct Tax Prohibited</h3><p>No
            <span title="A tax on each ">Capitation,</span>
            [or other
            <span title="Any tax charged directly against an individual, his property, or his income (as opposed to an indirect tax, which is imposed on purchased goods rather than on people).">direct, Tax</span>]<sup><a title="[The words in brackets have been modified by Amendment 16.] Click to see the 16th amendment." href="/amendment/16">amd</a></sup>
            shall be
            <span title="Assessed, charged, or imposed as a duty or burden.">laid</span>, unless
            <span title="(Apportioned or divided among the states) on the basis of each state's share or percentage of. (See I.2.3.)">in Proportion to</span>
            the <span title="A count of the population.">Census</span> or
            <span title="A counting or numbering.">Enumeration</span>
            <span title="Earlier in this document. (That is, in this Constitution. See I.2.3.)">herein before</span>
            directed to be taken.
          </p>
      
          
        <h3>
            Import and Export Duties Prohibited Between States</h3><p>No Tax or
            <span title="A tax or fee to be paid on imports, exports, or purchased goods.">Duty</span>
            shall be laid on
            <span title="Goods or commodities for sale.">Articles</span>
            <span title="Sent away or transported to some other place.">exported</span>
            from any State.
          </p>
      
          
        <h3>
            No preference in commerce for one state over another</h3><p>No
            <span title="The act of favoring or giving advantages to one over another.">Preference</span>
            shall be given by any
            <span title="An instance of the government's adjusting or directing some activity by law.">Regulation</span>
            of
            <span title="Trading or buying and selling of goods.">Commerce</span>
            or
            <span title="Tax money and other income that a government collects and receives into the treasury for public use.">Revenue</span>
            to the
            <span title="Harbors where ships may anchor for safety from storms, or to load or unload their cargoes.">Ports</span>
            of one State over those of another: nor shall
            <span title="Ships or boats.">Vessels</span>
            <span title="Going or intending to go.">bound</span> to, or from,
            one State, be
            <span title="Required, obligated, or forced.">obliged</span> to
            <span title="To report the arrival or cargo of a ship to port authorities.">enter</span>,
            <span title="To obtain permission from port authorities for a ship's departure.">clear</span>, or pay Duties in another.
          </p>
      
          
        <h3>
            How public money is spent</h3><p>No Money shall be
            <span title="Removed; taken out; withdrawn.">drawn</span> from the
            <span title="A place where public funds are deposited, kept, and paid out.">Treasury,</span>
            but <span title="As a result of.">in Consequence of</span>
            <span title="Acts of setting aside money for particular uses.">Appropriations</span>
            made by law; and a regular Statement and
            <span title="A written record of financial transactions.">Account</span>
            of the <span title="Amounts received.">Receipts</span> and
            <span title="Amounts spent or paid out.">Expenditures</span> of all
            <span title="Money collected and spent by the government on behalf of the people.">public Money</span>
            shall be
            <span title="Announced or made known to the public; put in print for public distribution.">published</span>
            from time to time.
          </p>
      
          
        <h3>
            Titles of nobility prohibited</h3><p>No
            <span title="An official designation of rank (such as duke, earl, baron, etc.) that places a person in an aristocratic class above the common people.">Title of Nobility</span>
            shall be
            <span title="Given, allowed, or bestowed.">granted</span> by the
            United States: And no Person holding any
            <span title="A position of responsibility or authority in government.">Office</span>
            of
            <span title="Gain, benefit, or financial reward.">Profit</span> or
            Trust under
            <span title="(That is, the United States. Thus the phrase ending with this word refers to any position in the federal government.)">them,</span>
            shall, without the
            <span title="Approval or agreement.">Consent</span> of the Congress,
            accept of any <span title="A gift.">present</span>,
            <span title="Payment; income; financial gain.">Emolument</span>,
            Office, or Title, of any kind whatever, from any King,
            <span title="A king or ruler of a nation.">Prince</span>, or
            <span title="A nation or government outside the United States.">foreign State</span>.
          </p>
      
        </section>
        <h2>
          <strong>Section 10</strong>
          - Powers Forbidden to States
            </h2>
        <section>
          
        <h3>
            Absolute restrictions</h3><p>No State shall enter into any
            <span title="A formal agreement or contract between two or more governments. (See II.2.2.)">Treaty</span>,
            <span title="A league or association of nations by treaty to further the interests they have in common.">Alliance</span>, or
            <span title="A union of independent states or nations for mutual support.">Confederation</span>;
            <span title="To give, allow, or bestow.">grant</span>
            <span title="(See definition under I.8.11.)">Letters of Marque and Reprisal</span>; coin
            <span title="Metal stamped into coins for use in commerce. (More recently, something used as a substitute for coins and generally accepted as a means of payment, such as bank notes or bills of credit.)">Money</span>;
            <span title="To send out; to issue or put into circulation.">emit</span>
            <span title="Written or printed notes, such as dollar bills, used as a substitute for money. (Sometimes called ">Bills of Credit</span>; make any Thing but gold and silver Coin a
            <span title="An offer; something that is or may be offered.">Tender</span>
            in Payment of
            <span title="Amounts of money owed to others.">Debts</span>;
            <span title="To approve or enact by vote. (In this case, the vote of a state legislature.)">pass</span>
            any
            <span title="(See definition under I.9.3.).">Bill of Attainder</span>,
            <span title="(See definition under I.9.3.).">ex post facto Law</span>, or Law
            <span title="Damaging, weakening, or making less.">impairing</span>
            the
            <span title="A binding power or force; a legal or moral bond or duty.">Obligation</span>
            of
            <span title="Formal, legally binding agreements between two or more persons or organizations.">Contracts,</span>
            or grant any
            <span title="An official designation of rank (such as duke, earl, baron, etc.) that places a person in an aristocratic class above the common people.">Title of Nobility</span>.
          </p>
      
          
        <h3>
            Taxes on imports and exports restricted</h3><p>No State shall, without
            the <span title="Approval or agreement.">Consent</span> of the
            Congress,
            <span title="To assess, charge, or impose as a duty or burden.">lay</span>
            any
            <span title="Taxes or duties, especially those to be paid on imported goods.">Imposts</span>
            or
            <span title="Taxes to be paid on imports, exports, or purchased goods.">Duties</span>
            on
            <span title="Goods imported or brought in from a foreign country, usually for the purposes of trade.">Imports</span>
            or
            <span title="Goods exported or sent out to a foreign country, usually for the purposes of trade.">Exports</span>, except what may be
            <span title="Completely.">absolutely</span> necessary for
            <span title="Carrying into effect.">executing</span> its
            <span title="Laws by which a state may inspect and control the quality and safety of commercial goods, especially imported goods.">inspection Laws:</span>
            and the
            <span title="The tax revenues remaining after inspection costs are paid.">net Produce</span>
            of all Duties and Imposts, laid by any State on Imports or Exports,
            shall be for the Use of the
            <span title="A place where public funds are deposited, kept, and paid out.">Treasury</span>
            of the United States; and all such Laws shall be
            <span title="Under the authority or control of.">subject to</span>
            the
            <span title="The act of reviewing and correcting.">Revision</span>
            and Controul of the Congress.
          </p>
      
          
        <h3>
            Other conditional restrictions</h3><p>No State shall, without the
            Consent of Congress, lay any
            <span title="A charge imposed on a commercial vessel for entering, remaining in, or leaving a port.">Duty of Tonnage</span>; keep
            <span title="Soldiers; professional military forces (that is, a standing army as opposed to a militia).">Troops</span>
            or Ships of War in time of Peace, enter into any Agreement or
            <span title="A contract or agreement between nations or states.">Compact</span>
            with another State, or with a
            <span title="A nation or government outside the United States.">foreign Power</span>; or
            <span title="To enter into; to begin and carry on; to take part in.">engage in</span>
            War, unless actually
            <span title="Attacked by an enemy.">invaded,</span> or in such
            <span title="Impending; threatening; ready to take place.">imminent</span>
            Danger as will not
            <span title="To allow or permit.">admit of</span> delay.
          </p>
      
        </section>
        <h1>
          Article II - The Executive Branch
        </h1>
        <h2>
          <strong>Section 1</strong>
          - The Office of President
        </h2>
        <section>
          
        <h3>
            Executive power given; term of office</h3><p>The
            <span title="The authority to execute or carry into effect the law and to administer the government. (In this case, federal law and the national government.)">executive Power</span>
            shall be
            <span title="Placed in the possession or control of; legally given to.">vested in</span>
            a President of the United States of America. He shall hold his
            <span title="A position of responsibility or authority in government.">Office</span>
            during the
            <span title="A designated period of time for which a person is elected or appointed to serve in public office.">Term</span>
            of four Years, and, together with the Vice President, chosen for the
            same Term, be elected as follows.
          </p>
      
          
        <h3>
            Presidential electors</h3><p>Each state shall appoint, in such
            <span title="Form; method; way.">Manner</span> as the
            <span title="An organized body of people having authority to make laws.">Legislature</span>
            <span title="Of the thing or things previously mentioned. (That is, of ">thereof</span>
            may direct, a Number of
            <span title="Qualified voters appointed by the states to elect the President and Vice President of the United States. (Together, these persons make up the ">Electors</span>
            equal to the whole Number of
            <span title="Members of the U.S. Senate, elected by the people to represent them in making laws for the United States. (Until 1913, Senators were appointed by the state legislatures to represent the state governments. See I.3.1; Amendment 17.)">Senators</span>
            and
            <span title="Members of the U.S. House of Representatives, elected by the people to represent them in making laws for the United States. (Also called Congressmen or Congresswomen. See I.2.)">Representatives</span>
            to which the State may
            <span title="To have a right or claim. (See I.2.3; I.3.1.)">be entitled</span>
            in the Congress: but no Senator or Representative, or Person holding
            an Office of Trust or
            <span title="Gain, benefit, or financial reward.">Profit</span>
            under the United States, shall be appointed an elector.
          </p>
      
          
        <h3>
            Original method of electing the President and Vice President</h3><p>[The
            Electors shall meet in their
            <span title="Individual; separate.">respective</span> States, and
            vote by
            <span title="A sheet of paper used to cast a secret vote.">Ballot</span>
            for two Persons, of whom one at least shall not be an
            <span title="A person who lives permanently in a certain place.">Inhabitant</span>
            of the same State with
            <span title="(That is, the electors.)">themselves</span>. And they
            shall make a List of all the Persons voted for, and of the Number of
            Votes for each; which List they shall sign and
            <span title="To declare or affirm in writing to be true or genuine.">certify</span>, and <span title="To send.">transmit</span>
            <span title="Closed or fastened (such as with wax or some other seal); affixed with an official seal (a stamp or other device used to certify that a signature or document is authentic).">sealed</span>
            to the
            <span title="The place from which governmental authority is exercised (such as a capital city).">Seat of the Government</span>
            of the United States, directed to the
            <span title="(See I.3.4-5.)">President of the Senate</span>. The
            President of the Senate shall, in the Presence of the Senate and
            House of Representatives, open all the
            <span title="Certified documents. (In this case, the electoral ballots.)">Certificates</span>, and the Votes shall then be counted. The Person having the
            greatest Number of Votes shall be the President, if such Number be a
            <span title="A number greater than half of the total.">Majority</span>
            of the whole Number of Electors appointed; and if there be more than
            one who have such Majority, and have an equal Number of Votes, then
            the House of Representatives shall immediately chuse by Ballot one
            of them for President; and if no Person have a Majority, then from
            the five highest on the List the
            <span title="(That is, the House of Representatives.)">said House</span>
            shall <span title="In the same way.">in like Manner</span> chuse the
            President. But in chusing the President, the Votes shall be taken by
            States, the
            <span title="The elected officials representing the voters, spoken of as a group.">Representation</span>
            from each State having one Vote; A
            <span title="The number of members of an organized body sufficient to conduct business.">quorum</span>
            for this Purpose shall
            <span title="To be formed, made up, or composed of.">consist of</span>
            a Member or Members from two thirds of the States, and a Majority of
            all the States shall be necessary to a Choice. In every
            <span title="Event; situation; circumstance.">Case</span>, after the
            Choice of the President, the Person having the greatest Number of
            Votes of the Electors shall be the Vice President. But if there
            should remain two or more who have equal Votes, the Senate shall
            chuse from them by Ballot the Vice President.]<sup><a title="[This paragraph has been superseded by Amendment 12.] Click to see the 12th amendment." href="/amendment/12">amd</a></sup>
          </p>
      
          
        <h3>
            Time of elections</h3><p>The Congress may
            <span title="To decide or settle.">determine</span> the Time of
            chusing the Electors, and the Day on which they shall give their
            Votes; which Day shall be the same throughout the United States.
          </p>
      
          
        <h3>
            Qualifications of the President</h3><p>No person except a
            <span title="Born in the United States or one of its territories.">natural-born</span>
            <span title="A person who owes allegiance to a government and is entitled to its protection. (See Amendment 14, section 1.)">Citizen</span>, or a Citizen of the United States, at the time of the
            <span title="The act of formally accepting and putting into effect.">Adoption</span>
            of this Constitution, shall be
            <span title="Legally qualified for.">eligible to</span> the Office
            of President; neither shall any person be eligible to that Office
            who shall not have
            <span title="Reached; achieved; arrived at.">attained to</span> the
            Age of thirty five Years, and been fourteen Years a
            <span title="A person who lives in a place permanently or for some period of time.">Resident</span>
            within the United States.
          </p>
      
          
        <h3>
            Replacing the President</h3><p>[In Case of the
            <span title="The act of removing, dismissing, or taking away (someone).">Removal</span>
            of the President from Office, or of his Death,
            <span title="The act of quitting or voluntarily giving up a position.">Resignation</span>, or <span title="Lack of ability.">Inability</span>
            to
            <span title="To perform or carry out.">discharge</span> the Powers
            and Duties of the
            <span title="(That is, the office of President.)">said Office</span>,
            <span title="The same thing previously mentioned. (That is, the ">the Same</span>
            shall
            <span title="To pass on to; to be transferred or handed down to.">devolve on</span>
            the Vice President, and the Congress may by Law
            <span title="To make plans or arrangements for in advance.">provide for</span>
            the Case of Removal, Death, Resignation, or Inability, both of the
            President and Vice President,
            <span title="Formally or publicly stating or announcing. (In this case, by enacting a law or laws.)">declaring</span>
            what Officer shall then act as President, and such Officer shall act
            <span title="In accordance with what has been stated. (That is, ">accordingly</span>
            until the
            <span title="Lack of ability or legal qualification.">Disability</span>
            be removed, or a President shall be elected.]<sup><a title="[This paragraph has been supplemented by Amendment 20, sections 3 and 4, and by Amendment 25.] Click to see amendments 20 &amp; 25" href="/amendment/20">amd</a></sup>
          </p>
      
          
        <h3>
            The President’s salary</h3><p>The President shall,
            <span title="(That is, according to a schedule set by Congress.)">at stated Times</span>, receive for his Services, a
            <span title="Payment.">Compensation</span>, which shall neither be
            increased nor
            <span title="Reduced; made less or smaller.">diminished</span>
            during the Period for which he shall have been elected, and he shall
            not receive within that Period any other
            <span title="Payment; income; financial gain.">Emolument</span> from
            the United States, or any of
            <span title="(That is, the United States; the states.)">them</span>.
          </p>
      
          
        <h3>
            Oath of office</h3><p>Before he
            <span title="To begin; to engage in.">enter on</span> the
            <span title="Performance; carrying out.">Execution</span> of his
            Office, he shall take the following
            <span title="A solemn declaration by an individual (such as in a court of law) that involves calling upon God to witness the truth of what one says.">Oath</span>
            or
            <span title="A solemn declaration that may be made in place of an oath and often results in legal penalties if the statement is found to be false.">Affirmation</span>:- “I do
            <span title="Very seriously; with religious reverence.">solemnly</span>
            swear (or affirm) that I will faithfully execute the Office of
            President of the United States, and will to the best of my Ability,
            <span title="To keep safe from harm or destruction; to uphold or sustain; to keep free from change, decay, or corruption.">preserve</span>, protect and defend the Constitution of the United States.”
          </p>
      
        </section>
        <h2>
          <strong>Section 2</strong>
          - Powers of the President
        </h2>
        <section>
          
        <h3>
            Military powers; the Cabinet; reprieves and pardons</h3><p>The
            President shall be
            <span title="The supreme commander of a military force.">Commander in Chief</span>
            of the Army and Navy of the United States, and of the
            <span title="A nation's able-bodied men who are not enlisted in the regular armed forces but may be called into military service in an emergency.">Militia</span>
            of the several States, when called into the actual Service of the
            United States; he may require the Opinion, in writing, of the
            <span title="Chief; most important; highest in rank.">principal</span>
            Officer in each of the
            <span title="Departments of the executive branch of the federal government, such as the Department of State and the Department of Defense. (The heads or ">executive Departments,</span>
            upon any Subject relating to the Duties of their
            <span title="Individual; separate.">respective</span>
            <span title="Positions of responsibility or authority in government.">Offices,</span>
            and he shall have Power to
            <span title="To give, allow, or bestow.">grant</span>
            <span title="Official declarations that temporarily suspend or delay penalties of the law (such as death sentences).">Reprieves</span>
            and
            <span title="Official declarations that cancel or reduce penalties of the law and usually grant freedom and full civil rights to those being pardoned.">Pardons</span>
            for
            <span title="Crimes; violations of the law.">Offenses</span> against
            the United States, except in Cases of
            <span title="A formal charge or accusation of misconduct in public office. (In the national government, such a charge may be made against an officer of the executive or judicial branch. See I.2.5; I.3.6-7; II.4.)">Impeachment</span>.
          </p>
      
          
        <h3>
            Treaties; appointing officers</h3><p>He shall have Power, by and with
            the <span title="Counsel; recommendation.">Advice</span> and
            <span title="Approval or agreement.">Consent</span> of the Senate,
            to make
            <span title="Formal agreements or contracts between two or more governments.">Treaties</span>, <span title="On the condition that; if.">provided</span>
            two thirds of the Senators
            <span title="In attendance at the time.">present</span>
            <span title="To agree or approve.">concur</span>; and he shall
            <span title="To name, designate, or propose (someone) for appointment or election to some public office.">nominate</span>, and by and with the Advice and Consent of the Senate, shall
            appoint
            <span title="The highest-ranking diplomatic officers of a nation, sent to represent that nation's government in foreign countries.">Ambassadors</span>, other
            <span title="Diplomatic representatives of a nation, usually ranking below ambassadors.">public Ministers</span>
            and
            <span title="Government agents who reside in foreign countries to represent the commercial interests of their own nation (considered to be of a lower grade than other diplomats).">Consuls</span>, Judges of the
            <span title="The highest court of justice in the United States. (See III.1.)">supreme Court</span>, and all other Officers of the United States, whose
            <span title="Instances of being named or appointed to public office.">Appointments</span>
            are not
            <span title="In this document. (That is, in this Constitution.)">herein</span>
            <span title="In a different way; by other means.">otherwise</span>
            <span title="Arranged for; agreed upon; established or required.">provided for</span>, and which shall be
            <span title="Set up or made firm.">established</span> by Law: but
            the Congress may by Law
            <span title="To place in the control of; to legally give to.">vest</span>
            the Appointment of such
            <span title="Lower-ranking government officials whose appointment does not require the ">inferior Officers,</span>
            as <span title="(That is, the Congress.)">they</span> think
            <span title="Fitting; suitable; appropriate.">proper,</span> in the
            President alone, in the Courts of Law, or in the
            <span title="The ">Heads of Departments</span>.
          </p>
      
          
        <h3>
            Filling vacancies</h3><p>The President shall have Power to fill up all
            <span title="Instances of a public office being left vacant or unoccupied (due to death, resignation, etc.).">Vacancies</span>
            that may happen during the
            <span title="A temporary stop in business, often for rest or relaxation.">Recess</span>
            of the Senate, by granting
            <span title="Official letters or certificates authorizing individuals to perform certain duties for the government.">Commissions</span>
            which shall
            <span title="To come to an end; to cease or terminate.">expire</span>
            at the End of
            <span title="(That is, the Senate's.)">their</span> next
            <span title="The period of time during which a legislature or other public body meets to conduct official business.">Session</span>.
          </p>
      
        </section>
        <h2>
          <strong>Section 3</strong>
          - Responsibilities of the President
        </h2>
        <section><h3>Recommending and enforcing laws; convening Congress; receiving
          ambassadors</h3><p>
          <span title="(That is, the President.)">He</span>
          shall from time to time give to the Congress Information of the
          <span title="The general condition of the United States; the circumstances, both foreign and domestic, affecting the safety and well- being of the nation.">State of the Union</span>, and recommend to
          <span title="(That is, the Congress's.)">their</span>
          <span title="Examination; evaluation; careful thought.">Consideration</span>
          such <span title="Steps or actions; proposed laws.">Measures</span> as
          he shall judge necessary and
          <span title="Appropriate or suitable; useful or profitable.">expedient</span>; he may, on
          <span title="Rare or unusual; special.">extraordinary</span>
          Occasions,
          <span title="To summon or call together; to cause to assemble.">convene</span>
          both
          <span title="Chambers or divisions of Congress. (That is, the Senate and the House of Representatives.)">Houses</span>, or either of them, and in Case of Disagreement between them, with
          Respect to the Time of
          <span title="The closing of the session of a public body.">Adjournment</span>, he may adjourn them to such Time as he shall think
          <span title="Fitting; suitable; appropriate.">proper</span>; he shall
          <span title="To admit; to permit to enter; to officially accept (in this case, to give diplomatic recognition to).">receive</span>
          <span title="(See definitions under II.2.2.)">Ambassadors</span> and
          other public
          <span title="(See definitions under II.2.2.)">Ministers</span>; he
          shall take Care that the Laws be faithfully
          <span title="Carried into effect.">executed</span>; and shall
          <span title="To appoint or authorize; to give an official letter or certificate authorizing a person to perform certain duties for the government.">Commission</span>
          all the Officers of the United States.
        </p></section>
        
        <h2>
          <strong>Section 4</strong>
          - Impeachment
        </h2>
        <section>
<h3>How officers may be removed</h3><p>
          The President, Vice President, and
          all
          <span title="Government officials. (In this case, the term includes all nonmilitary officers of the executive and judicial branches but excludes members of Congress. See I.5.2.)">civil Officers</span>
          of the United States, shall be removed from
          <span title="A position of responsibility or authority in government.">Office</span>
          on
          <span title="A formal charge or accusation of misconduct in public office. (See I.2.5.)">Impeachment</span>
          for, and
          <span title="The act of proving or finding a person guilty of some crime or misconduct. (See I.3.6-7.)">Conviction</span>
          of,
          <span title="The crime of betraying one's own country by trying to overthrow its government or by giving help to its enemies. (See III.3.1.)">Treason</span>
          ,
          <span title="The crime of giving, offering, or accepting money or some other favor in exchange for unjust or illegal conduct in an office of trust.">Bribery</span>
          , or other
          <span title="Acts of serious misconduct in public office (such as violating the Constitution or abusing one's political power to harm citizens or get personal gain).">high Crimes and Misdemeanors</span>.
        </p>
</section>
        <h1>
          Article III - The Judicial Branch
        </h1>
        <h2>
          <strong>Section 1</strong>
          - The Supreme Court and Other Federal Courts
        </h2>
        
        <section><h3>
    Judicial power given; term and payment of judges</h3><p>The
          <span title="The authority to interpret law and to administer justice by deciding cases brought before the courts. (In this case, federal courts.)">judicial Power</span>
          of the United States, shall be
          <span title="Placed in the possession or control of; legally given to.">vested in</span>
          one supreme Court, and in such
          <span title="Of a lower rank. (In this case, lower than the Supreme Court.)">inferior</span>
          Courts as the Congress may from time to time
          <span title="To appoint, decree, or institute; to set in order.">ordain</span>
          and
          <span title="To set up; to make firm or permanent.">establish</span>.
          The Judges, both of the supreme and inferior Courts, shall hold their
          <span title="Positions of responsibility or authority in government.">Offices</span>
          <span title="For life or until voluntary retirement unless convicted of an impeachable offense. (See II.4.)">during good Behaviour</span>, and shall,
          <span title="(That is, according to a schedule set by Congress.)">at stated Times</span>, receive for their Services a
          <span title="Payment.">Compensation</span>, which shall not be
          <span title="Reduced; made less or smaller.">diminished</span> during
          their
          <span title="The time during which something lasts or continues.">Continuance</span>
          in Office.
        </p></section>
      
        <h2>
          <strong>Section 2</strong>
          - Powers of the Judiciary
        </h2>
        <section>
          
        <h3>
            Cases that may be tried in federal courts</h3><p>The
            <span title="The authority to interpret law and to administer justice by deciding cases brought before the courts. (In this case, federal courts.)">judicial Power</span>
            shall
            <span title="To stretch out or reach; to apply.">extend</span> to
            all
            <span title="Lawsuits, accusations, or legal questions brought before a judge or court of law for decision.">Cases</span>,
            <span title="Whether involving matters of law or matters of equity. (Equity means justice, rightness, or fairness. In addition to the regular courts of law, some American states had established special ">in Law and Equity</span>,
            <span title="Originating; appearing; coming into being.">arising</span>
            under this Constitution, the Laws of the United States, and
            <span title="Formal agreements or contracts between two or more governments. (See II.2.2.)">Treaties</span>
            made, or which shall be made, under
            <span title="(That is, the United States'.)">their</span> Authority;
            --to all Cases affecting
            <span title="(See definitions under II.2.2.)">Ambassadors, other public Ministers, and Consuls</span>; --to all Cases of
            <span title="The authority to administer justice in matters relating to ships and shipping on the high seas (often involving the rights of citizens of foreign countries).">admiralty and maritime Jurisdiction</span>; --to
            <span title="Legal disputes; lawsuits.">Controversies</span> to
            which the United States shall be a
            <span title="A person or group taking one side in a dispute.">Party</span>; --to Controversies between two or more States; --[between a State
            and Citizens of another State;--]<sup><a title="[The words in brackets have been superseded by Amendment 11.] Click to see amendment 11" href="/amendment/11">amd</a></sup>
            between
            <span title="Persons who owe allegiance to a government and are entitled to its protection. (See Amendment 14, section 1.)">citizens</span>
            of different States, --between Citizens of the same State claiming
            Lands under
            <span title="Deeds or other written documents transferring property from one owner to another. (In this case, the state governments granted parcels of land to individual citizens. Disputes over the boundaries of some states and their western territories resulted in overlapping land grants and thus conflicting claims.)">Grants</span>
            of different States, [and between a State, or the Citizens
            <span title="Of the thing previously mentioned. (That is, of ">thereof</span>, and
            <span title="Nations or governments outside the United States.">foreign States</span>, Citizens, or
            <span title="Persons under the authority or control of a king or government.">Subjects</span>]<sup><a title="[The words in brackets have been superseded by Amendment 11.] Click to see amendment 11" href="/amendment/11">amd</a></sup>.
          </p>
      
          
        <h3>
            Authority of the Supreme Court</h3><p>In all Cases affecting
            Ambassadors, other public Ministers and Consuls, and those in which
            a State shall be Party, the supreme Court shall have
            <span title="The authority to be the first court to hear and decide cases.">original Jurisdiction</span>. In all the other Cases before mentioned, the supreme Court shall
            have
            <span title="The authority to hear and decide appeals from the decisions of lower courts. (An appeal is a request to have a case heard again in a higher court.)">Appellate Jurisdiction</span>, both as to
            <span title="Application of the law and examination of the facts in a case.">Law and Fact</span>, with such Exceptions, and under such
            <span title="Rules or orders having the force of law.">Regulations</span>
            as the Congress shall make.
          </p>
      
          
        <h3>
            Rules for federal criminal trials</h3><p>The Trial of all Crimes,
            except in Cases of
            <span title="A formal charge or accusation of misconduct in public office. (In the national government, such a charge may be made against an officer of the executive or judicial branch. See I.2.5; I.3.6-7; II.4.)">Impeachment;</span>
            shall be by
            <span title="A body of citizens appointed to examine a case brought before a court of law and to give a verdict (decision) according to the evidence presented. (See Amendments 6 and 7.)">Jury</span>; and such Trial shall be held in the State where the
            <span title="(That is, all crimes, except in cases of impeachment.)">said Crimes</span>
            shall have been committed; but when not committed within any State,
            the Trial shall be at such Place or Places as the Congress may by
            Law have directed.
          </p>
      
        </section>
        <h2>
          <strong>Section 3</strong>
          - Treason
        </h2>
        <section>
          
        <h3>
            Treason defined; evidence required</h3><p><span title="The crime of betraying one's own country by trying to overthrow its government or by giving help to its enemies.">Treason</span>
            against the United States, shall
            <span title="To be or exist; to be contained.">consist</span> only
            in
            <span title="Engaging in or carrying on; waging.">levying</span> War
            against <span title="(That is, the United States.)">them,</span> or
            in
            <span title="Giving support or loyalty to; uniting with; holding to.">adhering to</span>
            their
            <span title="Those who belong to a nation or armed force at war with one's own nation.">Enemies</span>, giving
            <span title="(That is, the enemies of the United States.)">them</span>
            <span title="Assistance, support, and encouragement.">Aid and Comfort</span>. No Person shall be
            <span title="Proven or found guilty of some crime or misconduct.">convicted</span>
            of Treason unless on the
            <span title="A solemn declaration of facts, usually made under oath.">Testimony</span>
            of two
            <span title="Persons who have definite knowledge of a fact or event and may give testimony in a court of law.">Witnesses</span>
            to the same
            <span title="An actual deed that is seen or open to view (as opposed to a secret intention that is not carried out).">overt Act</span>, or on
            <span title="An acknowledgment or voluntary admission of crime or guilt.">Confession</span>
            in open Court.
          </p>
      
          
        <h3>
            Punishment of those found guilty</h3><p>The Congress shall have Power
            to
            <span title="To formally or publicly state or announce. (In this case, by enacting laws.)">declare</span>
            the Punishment of Treason, but no
            <span title="Conviction for (in a court of law).">Attainder of</span>
            Treason shall work
            <span title="A condition of being legally declared " tainted="" or="" by="" crime="" and="" being="" barred="" from="" inheriting="" land="" keeping="" passing="" to="" one="" children="" other="" heirs="">Corruption of Blood,</span>
            or
            <span title="The loss of one's land or other property.">Forfeiture</span>
            except during the Life of the Person
            <span title="Convicted.">attainted</span>.
          </p>
      
        </section>
        <h1>
          Article IV - The States and the National Government
        </h1>
        <h2>
    <strong>Section 1</strong> - Recognition of laws, records, and court proceedings
        </h2>
        <section>
        
        <h3>
          Full Faith and credit given in each state to public acts, records, and
          judicial proceedings of all other states</h3><p>Full
          <span title="Acceptance; legal recognition and enforcement.">Faith and Credit</span>
          shall be given in each State to the
          <span title="Laws.">public Acts</span>,
          <span title="Official documents (such as deeds, wills, birth certificates, etc.).">Records</span>, and
          <span title="Rulings or decisions of the courts.">judicial Proceedings</span>
          of every other State; And the Congress may by general Laws
          <span title="To order, direct, or lay down as a rule.">prescribe</span>
          the <span title="Form; method; way.">Manner</span> in which such Acts,
          Records and Proceedings shall be
          <span title="Confirmed as valid, authentic, or legal.">proved</span>,
          and the Effect
          <span title="Of the thing or things previously mentioned. (That is, of the ">thereof</span>.
        </p>
      
        </section>
        <h2>
          <strong>Section 2</strong>
          - Citizens' rights; fugitives
        </h2>
        <section>
          
        <h3>
            Equal Privileges for all citizens</h3><p>The
            <span title="Persons who owe allegiance to a government and are entitled to its protection. (See Amendment 14, section 1. In the United States, citizens have the privilege and duty of voting in public elections, serving on juries, and otherwise maintaining our system of free government.)">Citizens</span>
            of each State shall
            <span title="To have a right or claim.">be entitled</span> to all
            <span title="Rights and protections which are granted or secured by law (such as the right to buy, own, and sell property; the right to travel on public highways; or the right to be protected from higher taxes than those imposed on other citizens).">Privileges and Immunities</span>
            of Citizens in the several States.
          </p>
      
          
        <h3>
            Extradition of criminals</h3><p>A Person charged in any State with
            Treason, Felony, or other Crime, who shall flee from Justice, and be
            found in another State, shall on Demand of the executive Authority
            of the State from which he fled, be delivered up, to be removed to
            the State having Jurisdiction of the Crime.
          </p>
      
          
        <h3>
            Fugitive slaves to be returned [now obsolete]</h3><p>[No
            <span title="(That is, a slave or indentured servant. An indentured servant is a person bound by contract to serve someone else for several years. See I.2.3.)">Person held to Service or Labour</span>
            in one State, under the Laws
            <span title="Of the thing previously mentioned. (That is, of ">thereof</span>, escaping into
            <span title="(That is, another state.)">another</span>, shall,
            <span title="As a result of.">in Consequence of</span> any Law or
            <span title="A rule or order having the force of law.">Regulation</span>
            <span title="In the place previously mentioned. (That is, in the state to which the slave has escaped.)">therein</span>, be
            <span title="Released, freed, or dismissed.">discharged</span> from
            such Service or Labour, but shall be delivered up on Claim of the
            <span title="A person. (In this case, the slaveowner or the employer with whom the indentured servant has contracted.)">Party</span>
            to whom such Service or Labour may be
            <span title="Owed.">due</span>.]<sup><a title="[This paragraph has been superseded by Amendment 13. Click to see amendment 13.]" href="/amendment/13">amd</a></sup>
          </p>
      
        </section>
        <h2>
          <strong>Section 3</strong>
          - New States and Territories
        </h2>
        <section>
          
        <h3>
            Creation of new states</h3><p>New States may be
            <span title="Allowed to enter.">admitted</span> by the Congress into
            <span title="(That is, the United States.)">this Union</span>; but
            no new State shall be formed or
            <span title="Founded, set up, or established.">erected</span> within
            the
            <span title="The limits or territory within which legal power or authority may be exercised.">Jurisdiction</span>
            of any other State; nor any State be formed by the
            <span title="Union or joining.">Junction</span> of two or more
            States, or Parts of States, without the
            <span title="Approval or agreement.">Consent</span> of the
            <span title="Organized bodies of people having authority to make laws.">Legislatures</span>
            of the States
            <span title="Interested; involved or affected.">concerned</span> as
            well as of the Congress.
          </p>
      
          
        <h3>
            Power of Congress over territories and federal property</h3><p>The
            Congress shall have Power to
            <span title="To part with; to give away; to transfer to someone else's control.">dispose of</span>
            and make all needful Rules and
            <span title="Rules or orders having the force of law.">Regulations</span>
            <span title="Concerning; pertaining to.">respecting</span> the
            <span title="Any geographical area owned or controlled by a state or nation, often located far from the seat of government. (In this case, a part of the United States that is not included within any state.)">Territory</span>
            or other Property belonging to the United States; and nothing in
            this Constitution shall be so
            <span title="Understood, interpreted, or explained.">construed</span>
            as to <span title="To injure or damage.">Prejudice</span> any
            <span title="Rights or legal titles to land.">Claims</span> of the
            United States, or of any
            <span title="Single; individual.">particular</span> State.
          </p>
      
        </section>
        <h2>
          <strong>Section 4</strong>
          - Federal Duties to the States
        </h2>
        <section><p>
          The United States shall
          <span title="To make sure; to secure.">guarantee</span> to every State
          in <span title="(That is, the United States.)">this Union</span> a
          <span title="Representative; pertaining to a republic, in which the people govern themselves through their elected representatives.">republican</span>
          Form of Government, and shall protect each of
          <span title="(That is, the states.)">them</span> against
          <span title="An attack by an enemy; an instance of a hostile army entering to plunder or conquer.">Invasion;</span>
          and on <span title="Request or petition.">Application</span> of the
          <span title="An organized body of people having authority to make laws.">Legislature</span>, or of the
          <span title="The officer who executes or carries into effect the laws of a particular government. (In this case, the governor of a state.)">Executive</span>
          (when the Legislature cannot be
          <span title="Summoned or called together; assembled for a meeting.">convened</span>) against
          <span title="Rebellion, rioting, etc., by mobs within a particular state.">domestic Violence</span>.
    </p></section>
        <h1>
          Article V - Amendment Process
        </h1>
        
        <section><p>
          The Congress, whenever two thirds of both
          <span title="Chambers or divisions of Congress. (That is, the Senate and the House of Representatives.)">Houses</span>
          shall <span title="To think, judge, or conclude.">deem</span> it
          necessary, shall <span title="To recommend or suggest.">propose</span>
          <span title="Additions, corrections, or other changes in wording.">Amendments</span>
          to this Constitution, or, on the
          <span title="A request or petition.">Application</span> of the
          <span title="Organized bodies of people having authority to make laws.">Legislatures</span>
          of two thirds of the several States, shall
          <span title="To invite or direct to meet; to summon or assemble.">call</span>
          a
          <span title="A formal meeting or assembly of citizens, specially organized to consider important political matters.">Convention</span>
          for proposing Amendments, which, in either Case, shall be
          <span title="Legally recognized and enforceable.">valid</span> to all
          <span title="Intentions; aims. (">Intents</span> and Purposes, as Part
          of this Constitution, when
          <span title="Officially approved or confirmed by vote.">ratified</span>
          by the Legislatures of three fourths of the several States, or by
          Conventions in three fourths
          <span title="Of the thing previously mentioned. (That is, of ">thereof</span>, as the one or the other <span title="Method; way.">Mode</span> of
          Ratification may be proposed by the Congress;
          <span title="On the condition that; if.">Provided that</span> no
          Amendment which may be made <span title="Before.">prior to</span> the
          year one thousand eight hundred and eight shall in any
          <span title="Form; method; way.">manner</span> affect the first and
          fourth clauses in the ninth section of the first Article; and that no
          State, without its
          <span title="Approval or agreement.">Consent</span>, shall
          <span title="To have (something) withheld or taken away.">be deprived of</span>
          its equal
          <span title="The right to vote. (In this case, a state's right to the same number of votes in the Senate allowed to every other state, regardless of differences in population. See I.3.1.)">Suffrage</span>
          in the Senate.
    </p></section>
        <h1>
          Article VI - Debts; Supremacy Clause; Duties of Officials
        </h1>
        <section>
          
        <h3>
            National debts still in force</h3><p>All
            <span title="Amounts of money owed to others.">Debts</span>
            <span title="Undertaken or incurred; agreed to by contract.">contracted</span>
            and
            <span title="Obligations, agreements, or contracts.">Engagements</span>
            entered into, before the
            <span title="The act of formally accepting and putting into effect.">Adoption</span>
            of this Constitution, shall be as
            <span title="Legally recognized and enforceable.">valid</span>
            against the United States under this Constitution, as under the
            <span title="The United States under its first form of government, the Articles of Confederation (before the adoption of the Constitution).">Confederation</span>.
          </p>
      
          
        <h3>
            Supreme law of the land</h3><p>This Constitution, and the Laws of the
            United States which shall be made
            <span title="In agreement with or under the authority of the thing previously mentioned. (That is, of ">in Pursuance thereof;</span>
            and all
            <span title="Formal agreements or contracts between two or more governments. (See II.2.2.)">Treaties</span>
            made, or which shall be made, under the Authority of the United
            States, shall be the
            <span title="Highest in authority.">supreme</span> Law of the land;
            and the Judges in every State shall be
            <span title="Legally restrained or obligated.">bound</span>
            <span title="By the thing or things previously mentioned. (That is, by the Constitution and the laws and treaties made under its authority.)">thereby</span>, any Thing in the
            <span title="A set of basic rules and principles that determine how a state or nation is organized and governed.">Constitution</span>
            or Laws of any State
            <span title="Being in opposition or out of harmony.">to the contrary</span>
            <span title="In spite of; nevertheless.">notwithstanding</span>.
          </p>
      
          
        <h3>
            Oath to support the Constitution; no religious test</h3><p>The
            <span title="Members of the U.S. Senate, elected by the people to represent them in making laws for the United States. (Until 1913, Senators were appointed by the state legislatures to represent the state governments. See I.3.1; Amendment 17.)">Senators</span>
            and
            <span title="Members of the U.S. House of Representatives, elected by the people to represent them in making laws for the United States. (Also called Congressmen or Congresswomen. See I.2.)">Representatives</span>
            <span title="(See I.2; I.3.)">before mentioned</span>, and the
            Members of the several
            <span title="The lawmaking bodies of the state governments.">State Legislatures</span>, and all <span title="(See II.1.1; II.2.1-2.)">executive</span>
            and
            <span title="(See III.1.)">judicial Officers</span>, both of the
            United States and of the several States, shall be bound by
            <span title="A solemn declaration by an individual (such as in a court of law) that involves calling upon God to witness the truth of what one says.">Oath</span>
            or
            <span title="A solemn declaration that may be made in place of an oath and 
           often results in legal penalties if the statement is found to be false.">Affirmation,</span>
            to
            <span title="To sustain or uphold; to maintain; to keep from failing.">support</span>
            this Constitution; but no
            <span title="An oath whereby a person entering public office declares his belief in certain religious doctrines.">religious Test</span>
            shall ever be required as a
            <span title="A condition that a person must meet before being considered fit or eligible for a certain privilege.">Qualification</span>
            to any
            <span title="A position of responsibility or authority in government.">Office</span>
            or
            <span title="Any civic duty or responsibility committed to a person by the voters or the government.">public Trust</span>
            under the United States.
          </p>
      
        </section>
        <h1>
          Article VII - Ratifying the Constitution
        </h1>
        <section>
          
        <h3>
            Approval of nine states required</h3><p>The
            <span title="Official approval or confirmation by vote.">Ratification</span>
            of the
            <span title="Formal meetings or assemblies of citizens, specially organized 
           to consider important political matters.">Conventions</span>
            of nine States, shall be
            <span title="Enough; adequate.">sufficient</span> for the
            <span title="The act of setting up or making firm or permanent.">Establishment</span>
            of this Constitution between the States so ratifying
            <span title="The same thing previously mentioned. (That is, ">the Same</span>.
          </p>
      
          
        <p>
            done in
            <span title="A formal meeting or assembly of citizens, specially organized to consider important political matters. (In this case, the Constitutional Convention of 1787.)">Convention</span>
            by the
            <span title="Being of one mind; with all being agreed.">Unanimous</span>
            <span title="Approval or agreement.">Consent</span> of the States
            <span title="Represented by delegates in attendance on that date. (That is, all of the original thirteen states except Rhode Island and New York. Rhode Island was the only state that had sent no delegates to the convention. Alexander Hamilton of New York signed the Constitution even though his state, lacking full representation at the end of the convention, could not take part in the voting.)">present</span>
            the Seventeenth Day of September in the
            <span title="(That is, A.D.; from Anno Domini, which is Latin for 'in the year of our Lord,' signifying the number of years since the birth of Christ.)">year of our Lord</span>
            one thousand seven hundred and eighty seven, and of the
            <span title="A condition of being self-governing, not depending on another nation or subject to its control.">Independence</span>
            of the United States of America the
            <span title="(That is, the twelfth year of American independence.)">Twelfth</span>. <span title="As evidence or proof.">In Witness</span>
            <span title="Of which. (That is, of the facts stated in the preceding sentence.)">whereof</span>
            We have <span title="To this document.">hereunto</span>
            <span title="Signed; written underneath.">subscribed</span> our
            Names.
          </p>
      
        </section>
    </article>
  </main>
`;

class USConstitutionElement extends HTMLElement {
  constructor() {
    super();

    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {}
}

if (!customElements.get("us-constitution")) {
  customElements.define("us-constitution", USConstitutionElement);
}
